import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, useGLTF } from "@react-three/drei";
import * as portfolioAPI from '../../utilities/portfolio-api'
import Lights from "../../components/Lights/Lights";
import Sweater from "../../components/Sweater/Sweater";
import {Shoe, ShoeInstances} from "../../components/Shoe/Shoe";


const Jacket = ({...props}) => {
    // const meshes = useRef(null);
    // useFrame(() => (meshes.current.rotation.y += 0.006));
    const { nodes } = useGLTF('/jacket/jacket.gltf')
    return (
      <group {...props} dispose={null} >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
            <mesh castShadow geometry={nodes.jacket_low_Fabric_0.geometry} material-color={props.colors.mesh}/>
            <mesh castShadow geometry={nodes.zipper_tab_low_Metal_0.geometry} material={props.colors.stripes} />
            <mesh castShadow geometry={nodes.zipper_slider_low_Metal_0.geometry} material={props.colors.sole} />
          </group>
        </group>
      </group>
    );
  }
  

export default function ModelDetail({ models, user , setModels}) {
    let { id } = useParams();
    const [model, setModel] = useState([]);
    useEffect(function () {
        async function getModel(id) {
            const object = models.filter((model) => model._id === id);
            const objModel = await portfolioAPI.getOne(id);
                setModel(...object);
        }
        getModel(id);
    }, [models, id, user]);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await portfolioAPI.deleteModel(id)
            setModels(...models)
            console.log('deleted')
            navigate('/portfolio')
        } catch (e) {
            let err = new Error(e)
            console.log(err)
        }
    }
    function Loader() {
        const { progress } = useProgress()
        return <Html center>{progress} % loaded</Html>
      }

    return (
        <>
            <main className='new-model' >
                <div className='wrapper'>
                    <div className='card'>
                        <div className="product-canvas">
                            <Canvas shadows
                                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                                    <Suspense fallback={<Loader />}>
                                <group>
                                </group>
                                {model.product === '/shoe/shoe.gltf' ? <ShoeInstances><Shoe castShadow position={[0.001, 0, 8]} />
                                <meshStandardMaterial color={model.mesh}/></ShoeInstances>
                                    : model.product === '/jacket/jacket.gltf' ? <Jacket castShadow colors={{mesh:model.mesh, stripes: model.stripes, sole: model.sole}}/>
                                        : model.product === '/sweater/sweater.gltf' ? <Sweater /> : <ShoeInstances><Shoe /></ShoeInstances>
                                }
                                <Lights />
                                <OrbitControls />
                                </Suspense>
                            </Canvas >
                        </div>
                    </div>
                    <div className="capitalize">
                        <label htmlFor="name">Name</label>
                        {model.name}
                    </div>
                    <label htmlFor="name">Description</label>
                    <div>
                        {model.description}
                    </div>
                </div>
            </main>
            <button onClick={() => handleDelete(id)}>Delete Design</button>
            <Link  to={'/portfolio'}>Portfolio</Link>
        </>
    );
}
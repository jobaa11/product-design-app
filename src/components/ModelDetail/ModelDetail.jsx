import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as modelsAPI from '../../utilities/models-api'
import Lights from "../../components/Lights/Lights";
import Jacket from "../../components/Jacket/Jacket";
import Sweater from "../../components/Sweater/Sweater";
import Shoe from "../../components/Shoe/Shoe";

export default function ModelDetail({ models }) {
    let { id } = useParams();
    const [model, setModel] = useState([]);
    useEffect(function () {
        async function getModel(id) {
            const object = models.filter((model) => model._id === id);
            setModel(...object);
        }
        getModel(id);
    }, [models, id]);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await modelsAPI.deleteModel(id)
            navigate('/portfolio')
        } catch (e) {
            let err = new Error(e)
            console.log(err)
        }
    }

    return (
        <>
            <main className='new-model' >
                <div className='wrapper'>
                    <div className='card'>
                        <div className="product-canvas">
                            <Canvas shadows
                                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                                <group>
                                    <mesh
                                        receiveShadow
                                        rotation={[-Math.PI / 2, 0, 0]}
                                        position={[0, -3, 2]}>
                                        <planeBufferGeometry attach='geometry' args={[100, 100]} />
                                        <shadowMaterial attach='material' opacity={.3} />
                                    </mesh>
                                </group>
                                {model.product === '/shoe/shoe.gltf' ? <Shoe />
                                    : model.product === '/jacket/jacket.gltf' ? <Jacket />
                                        : model.product === '/sweater/sweater.gltf' ? <Sweater /> : <Shoe />
                                }
                                <Lights />
                                <OrbitControls />
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
            <button onClick={(() => handleDelete(id))}>Delete Design</button>
        </>
    );
}
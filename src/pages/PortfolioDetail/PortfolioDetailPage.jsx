import { Canvas } from "@react-three/fiber";
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";
import Jacket from "../../components/Jacket/Jacket";
import Sweater from "../../components/Sweater/Sweater";
import Shoe from "../../components/Shoe/Shoe";
import { useState, useEffect } from 'react'
import * as modelsApi from '../../utilities/models-api'
import { useParams } from "react-router-dom";


export default function PortfolioDetailPage(props) {
    const [models, setModels] = useState([]);
    let { id } = useParams();



    useEffect(function () {
        async function getModels() {
            const models = await modelsApi.getById(id);
            setModels(models);
        }
        getModels();
    }, []);

    const handleDelete = async () => {
        try {
            let object = await modelsApi.deleteModel(id)
        } catch {

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
                                {models.product === '/shoe/shoe.gltf' ? <Shoe />
                                    : models.product === '/jacket/jacket.gltf' ? <Jacket />
                                        : models.product === '/sweater/sweater.gltf' ? <Sweater /> : <Shoe />

                                }
                                <Lights />
                                <OrbitControls />
                            </Canvas >
                        </div>


                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        {props.user.name}
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        {props.user.email}
                    </div>
                    <button className="create-model-btn" type="submit">Update Design</button>
                </div>
            </main>
            <button onClick={handleDelete}>Delete</button>

        </>
    )
}
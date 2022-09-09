import { Canvas } from "@react-three/fiber";
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";
import Jacket from "../../components/Jacket/Jacket";
import Sweater from "../../components/Sweater/Sweater";
import Shoe from "../../components/Shoe/Shoe";
import { useState, useEffect } from 'react'
import * as modelsAPI from '../../utilities/models-api'
import { useParams, useNavigate } from "react-router-dom";


export default function PortfolioDetailPage({ models }) {
    const navigate = useNavigate();
    const { id } = useParams();
    // const object = models.filter((model) => model._id === id);
    const [model, setModel] = useState([]);


    useEffect(function () {
        async function getModel() {
            const object = models.filter((model) => model._id === id);
            setModel(...object);
        }
        getModel();
    }, [models]);

    const handleDelete = async () => {
        await modelsAPI.deleteModel(id)
        navigate('/portfolio')
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
                    <div>
                        <label htmlFor="name">Name</label>
                        {model.name}
                    </div>
                    <label htmlFor="name">Description</label>

                    <div>

                        {model.description}

                    </div>
                    <button className="create-model-btn" type="submit">Update Design</button>
                </div>
            </main>
            <button onClick={handleDelete}>Delete</button>

        </>
    )
}
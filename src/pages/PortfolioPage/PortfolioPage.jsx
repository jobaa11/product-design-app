import { useEffect, useState } from "react";
import * as modelsApi from '../../utilities/models-api'
import { Canvas } from "@react-three/fiber";
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";

export default function Portfolio() {
    const [models, setModels] = useState([]);

    useEffect(function () {
        async function getModels() {
            const models = await modelsApi.getAll();
            setModels(models);
        }
        getModels();
    }, []);



    return (
        <>
            <h1>Portfolio</h1>

            {models.map((model, idx) =>
            <div className="portfolio" >
<div className="new-model">
            <div className='wrapper'>
                <div className='card'>
                    <div className="product-canvas">
                        <div>{console.log(models)}</div>
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
                            <Lights />
                            <OrbitControls />
                        </Canvas >
                    </div>
                </div>
            </div>
            </div>
            </div>
            )}
        </>
    )

}

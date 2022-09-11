import { Canvas } from "@react-three/fiber";
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";
import Jacket from "../../components/Jacket/Jacket";
import Sweater from "../../components/Sweater/Sweater";
import {Shoe} from "../../components/Shoe/Shoe";



export default function PortfolioListPage({ model }) {

    return (
        <>
            <div className='new-model'>
                <div className='wrapper'>

                    <div className='card'>
                        <div className="product-canvas">
                            <Canvas shadows
                                linear
                                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                                {/* <group className='invisible-plane'>
                                    <mesh
                                        receiveShadow
                                        rotation={[-Math.PI / 2, 0, 0]}
                                        position={[0.001, -3.001, 2]}>
                                        <planeBufferGeometry attach='geometry' args={[100, 100]} />
                                        <shadowMaterial attach='material' opacity={.3} />
                                    </mesh>
                                </group> */}
                                {model.product === '/shoe/shoe.gltf' ? <Shoe textures={model} />
                                    : model.product === '/jacket/jacket.gltf' ? <Jacket textures={model} />
                                        : model.product === '/sweater/sweater.gltf' ? <Sweater textures={model} /> : <Shoe textures={model} />

                                }
                                <Lights />
                                <OrbitControls />
                            </Canvas >
                        </div>
                    </div>
                    <div>
                        <label htmlFor="product">Design</label>
                        <h3 className='capitalize'>{model.product.split('/')[1]}</h3>

                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <h3 className='capitalize'>{model.name}</h3>
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <h3 className="desc">{model.description}</h3>

                    </div>
                </div>
            </div>
        </>
    )
}
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import Lights from '../../components/Lights/Lights';
import { OrbitControls, softShadows } from '@react-three/drei';
import Shoe from '../../components/Shoe/Shoe';



export default function Index(props) {
    return (
        <>
            <Canvas shadows
                className='canvas'
                colorManagement
                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <Suspense fallback={null}>
                    <group>
                        <mesh
                            receiveShadow
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, -3, 0]}>
                            <planeBufferGeometry attach='geometry' args={[100, 100]} />
                            <shadowMaterial attach='material' opacity={.3} />
                        </mesh>
                    </group>
                    <Shoe />
                    <Lights />
                    <OrbitControls />
                </Suspense>
            </Canvas >
            <div className='scrollArea'>
                <div style={{ position: 'sticky', top: 0 }}></div>
            </div></>
    )
}
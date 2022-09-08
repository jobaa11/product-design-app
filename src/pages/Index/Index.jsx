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
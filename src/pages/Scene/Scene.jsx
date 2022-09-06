import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import Lights from '../../components/Lights/Lights';
import { OrbitControls, softShadows } from '@react-three/drei';
import Model from '../../components/Model/Model';
softShadows()

export default function Scene(props) {
    return (
        <Canvas shadows
            colorManagement
            camaera={{ position: [-5, 2, 10], fov: 70 }}>
            <Suspense fallback={null}>
                <Model />
                <Lights />
                <OrbitControls />
            </Suspense>
        </Canvas >
    )
}

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import Lights from '../../components/Lights/Lights';
import { OrbitControls, softShadows, Html, useProgress } from '@react-three/drei';
import Shoe from '../../components/Shoe/Shoe';
softShadows();

export default function Index(props) {
    function Loader() {
        const { progress } = useProgress()
        return <Html center>{progress} % loaded</Html>
      }
    return (
        <>
            <Canvas shadows
                className='canvas'
                linear
                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <Suspense fallback={<Loader />}>
                    <Lights />
                    <OrbitControls />
                    <Shoe />
                </Suspense>
            </Canvas >
        </>
    );
}
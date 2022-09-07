import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import Lights from '../../components/Lights/Lights';
import { OrbitControls, softShadows, Environment } from '@react-three/drei';
import Sweater from '../../components/Sweater/Sweater';
import Shoe from '../../components/Shoe/Shoe';
import Jacket from "../../components/Jacket/Jacket";
import { Section } from '../../components/Sections/Sections'


softShadows();

export default function Scene(props) {
    return (
        <Canvas shadows
            colorManagement
            camaera={{ position: [-5, 2, 10], fov: 70 }}>
            <Suspense fallback={null}>
                <OrbitControls />
                <Lights />
                <Environment preset='dawn'/>
                <Section factor={1.5}>
                    <group>
                        <mesh
                            receiveShadow
                            rotation={[-Math.PI / 2, 0, 0]}
                            position={[0, -3, 0]}>
                            <planeBufferGeometry attach='geometry' args={[100, 100]} />
                            <shadowMaterial attach='material' opacity={.3} />
                        </mesh>
                    </group>
                    <Shoe customColors={{ mesh: 'lightpink', stripes: 'blue', sole: 'white' }} />
                    {/* <Sweater /> */}
                    {/* <Jacket /> */}
                </Section>
            </Suspense>
        </Canvas >
    )
}

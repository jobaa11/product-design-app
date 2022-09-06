import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import { Section } from '../../pages/Sections/Sections';

const Box = ({ modelName }) => {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.015));
    return (
        <Section factor={1.5}>
            <mesh box={modelName} castShadow ref={mesh}>
                <boxBufferGeometry attach='geometry' arg={[1, 1, 1]} />
                <meshStandardMaterial attach='material' color='lightpink' transparent />
            </mesh>
        </Section>
    );
};


export default Box;
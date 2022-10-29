import { useGLTF, Merged } from '@react-three/drei'
import { useRef, useState, createContext, useMemo, useContext } from 'react'
import { useFrame } from '@react-three/fiber';

const context = createContext()

export function HoodieInstances({ children, ...props }) {

    const { nodes, } = useGLTF('/models/hoodie/hoodie-transformed.glb')
    const instances = useMemo(() => ({ Cube007: nodes['Cube007'], Cube007_1: nodes['Cube007_1'], Cube007_2: nodes['Cube007_2'] }), [nodes])
    return (
        <Merged castShadow receiveShadow meshes={instances} {...props}>
            {(instances) => <context.Provider value={instances} children={children} />}
        </Merged>
    );
}

export function Hoodie(props) {
    const [spin, setSpin] = useState(true)
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.y += spin ? 0.004 : 0));
    const instances = useContext(context)
    return (
        <group {...props} dispose={null} onClick={(e) => setSpin(!spin)} ref={mesh}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group position={[0, 0.8, 0]} scale={.71}>
                        <instances.Cube007 color={props.mesh} />
                        <instances.Cube007_1 color={props.stripes} />
                        <instances.Cube007_2 color={props.sole} />
                    </group>
                </group>
            </group>
        </group>
    )
}
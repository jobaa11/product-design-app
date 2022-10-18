import { useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';



export default function Hoodie(props) {
    const [spin, setSpin] = useState(true)
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.y += spin ? 0.004 : 0));
    const { nodes, materials } = useGLTF('/models/hoodie/hoodie-transformed.glb')
    return (
        <group onClick={(e) => setSpin(!spin)} ref={mesh}  {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
                <group position={[0, 0.8, 0]} scale={.71}>
                    <mesh castShadow geometry={nodes.Cube007.geometry} material={materials.Hoodie} material-color={props.mesh}/>
                    <mesh castShadow geometry={nodes.Cube007_1.geometry} material={materials.cap} material-color={props.stripes}/>
                    <mesh castShadow geometry={nodes.Cube007_2.geometry} material={materials.Strings} material-color={props.sole}/>
                </group>
            </group>
        </group>
    </group>
    )
}
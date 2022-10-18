import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Shirt(props) {
  const [spin, setSpin] = useState(true)
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.y += spin ? 0.006 : 0));
  const { nodes, materials } = useGLTF('/models/shirt/shirt-transformed.glb')
  return (
    <group onClick={(e) => setSpin(!spin)} ref={mesh} {...props} dispose={null}>
      <group position={[0, 0.6, 0]} scale={[1, 1, 0.88]}>
        <mesh castShadow geometry={nodes.Cube019.geometry} material={materials.main} material-color={props.mesh}/>
        <mesh castShadow geometry={nodes.Cube019_1.geometry} material={materials.linen} material-color={props.stripes}/>
        <mesh castShadow geometry={nodes.Cube019_2.geometry} material={materials.bottom} material-color={props.sole}/>
      </group>
    </group>
  )
}
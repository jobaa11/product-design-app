import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function WomenShirt(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.005 : 0));
  const { nodes, materials } = useGLTF('/models/women-shirt/women-shirt-transformed.glb')
  return (
    <group onClick={(e) => setSpin(!spin)} ref={mesh} {...props} dispose={null}>
      <group position={[0.0, 4.5, 0.0]} scale={[1, 1, 0.86]}>
        <mesh castShadow geometry={nodes.Cube026.geometry} material={materials.linen} material-color={props.mesh} />
        <mesh castShadow geometry={nodes.Cube026_1.geometry} material={materials['shirt main']} material-color={props.stripes} />
        <mesh castShadow geometry={nodes.Cube026_2.geometry} material={materials['inner shirt']} material-color={props.sole} />
      </group>
    </group>
  )
}
import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function WomenPants(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.006 : 0));
  const { nodes, materials } = useGLTF('/models/women-pants/women-pants-transformed.glb')
  return (
    <group onClick={(e) => setSpin(!spin)} ref={mesh} {...props} dispose={null}>
      <group position={[0, 0.2, 0.16]} rotation={[Math.PI / 2, 0, 0]} scale={[0.32, 0.32, 0.2]}>
        <mesh castShadow geometry={nodes.Plane.geometry} material={materials.MAIN} material-color={props.mesh} />
        <mesh castShadow geometry={nodes.Plane_1.geometry} material={materials.HIGHLIGHTS} material-color={props.stripes} />
        <mesh castShadow geometry={nodes.Plane_2.geometry} material={materials.linen} material-color={props.sole} />
      </group>
    </group>
  )
}
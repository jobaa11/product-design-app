import { useGLTF } from '@react-three/drei'

export default function Kicks(props) {
  const { nodes, materials } = useGLTF('/kicks.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.TOP.geometry} material={nodes.TOP.material} scale={[0.76, 1.14, 1.45]} />
      <mesh geometry={nodes.MID.geometry} material={nodes.MID.material} scale={[0.76, 1.14, 1.45]} />
      <mesh geometry={nodes.LACES.geometry} material={nodes.LACES.material} position={[0.39, 0.72, 0.34]} />
    </group>
  )
}

useGLTF.preload('/kicks.gltf')
import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Skirt(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.004 : 0));
  const { nodes, materials } = useGLTF('/models/skirt/skirt-transformed.glb')
  return (
    <group onClick={(e) => setSpin(!spin)} ref={mesh} {...props} dispose={null}>
      <group position={[0, 0.4, 0]} scale={[1.24, 2.05, 1.24]}>
        <mesh castShadow geometry={nodes.Cube021.geometry} material={materials.main} material-color={props.mesh} />
        <mesh castShadow geometry={nodes.Cube021_1.geometry} material={materials.linens} material-color={props.stripes} />
        <mesh castShadow geometry={nodes.Cube021_2.geometry} material={materials['top layer']} material-color={props.sole} />
      </group>
    </group>
  )
}
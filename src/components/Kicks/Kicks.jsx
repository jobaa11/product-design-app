import { useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.004 : 0));
  const { nodes, materials } = useGLTF('/models/kicks/kicks.gltf')
  return (
    <group onClick={(e) => setSpin(!spin)} ref={mesh} {...props} dispose={null}>
      <group position={[0, 0.0, 0]}>
        <mesh castShadow geometry={nodes.LACE.geometry} material={materials.LACES} material-color={props.mesh}/>
        <mesh castShadow geometry={nodes.LACE_1.geometry} material={materials.TOP} material-color={props.stripes}/>
        <mesh castShadow geometry={nodes.LACE_2.geometry} material={materials.MID} material-color={props.sole}/>
      </group>
    </group>
  )
}
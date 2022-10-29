import { useRef, useState, createContext, useMemo, useContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const context = createContext();

export function ShirtInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/shirt/shirt-transformed.glb')
  const instances = useMemo(() => ({ Cube019: nodes['Cube019'], Cube019_1: nodes['Cube019_1'], Cube019_2: nodes['Cube019_2'] }), [nodes])
  return (
    <Merged castShadow receiveShadow meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function Shirt(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.006 : 0));
  const instances = useContext(context)
  return (
    <group {...props} dispose={null} onClick={(e) => setSpin(!spin)} ref={mesh}>
      <group position={[0, 0.6, 0]} scale={[1, 1, 0.88]}>
        <instances.Cube019 color={props.mesh} />
        <instances.Cube019_1 color={props.stripes} />
        <instances.Cube019_2 color={props.sole} />
      </group>
    </group>
  );
}

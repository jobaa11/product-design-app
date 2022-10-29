import { useGLTF, Merged } from '@react-three/drei'
import { useRef, useState, createContext, useMemo, useContext } from 'react'
import { useFrame } from '@react-three/fiber';

const context = createContext();

export function WomenShirtInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/women-shirt/women-shirt-transformed.glb')
  const instances = useMemo(() => ({ Cube026: nodes['Cube026'], Cube026_1: nodes['Cube026_1'], Cube026_2: nodes['Cube026_2'] }), [nodes])
  return (
    <Merged castShadow receiveShadow meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function WomenShirt(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.005 : 0));
  const instances = useContext(context)
  return (
    <group {...props} dispose={null} onClick={(e) => setSpin(!spin)} ref={mesh}>
      <group position={[0.0, 4.5, 0.0]} scale={[1, 1, 0.86]}>
        <instances.Cube026 color={props.mesh} />
        <instances.Cube026_1 color={props.stripes} />
        <instances.Cube026_2 color={props.sole} />
      </group>
    </group>
  );
}
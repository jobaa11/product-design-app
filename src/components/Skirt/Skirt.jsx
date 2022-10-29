import { useGLTF, Merged } from '@react-three/drei'
import { useRef, useState, createContext, useMemo, useContext } from 'react'
import { useFrame } from '@react-three/fiber';

const context = createContext();


export function SkirtInstances({ children, ...props }) {

  const { nodes } = useGLTF('/models/skirt/skirt-transformed.glb')

  const instances = useMemo(() => ({ Cube021: nodes['Cube021'], Cube021_1: nodes['Cube021_1'], Cube021_2: nodes['Cube021_2'] }), [nodes])
  return (

    <Merged castShadow receiveShadow meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function Skirt(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.004 : 0));
  const instances = useContext(context)
  return (
    <group {...props} dispose={null} onClick={(e) => setSpin(!spin)} ref={mesh}>
      <group position={[0, 0.4, 0]} scale={[1.24, 2.05, 1.24]}>
        <instances.Cube021 color={props.mesh} />
        <instances.Cube021_1 color={props.stripes} />
        <instances.Cube021_2 color={props.sole} />
      </group>
    </group>
  );
}
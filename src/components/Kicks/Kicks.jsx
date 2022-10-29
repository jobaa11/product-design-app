import { useGLTF, Merged } from '@react-three/drei'
import { useRef, useState, createContext, useMemo, useContext } from 'react'
import { useFrame } from '@react-three/fiber';

const context = createContext();

export function KicksInstances({ children, ...props }) {

  const { nodes } = useGLTF('/models/kicks/kicks-transformed.glb')
  const instances = useMemo(() => ({ LACE: nodes['LACE'], LACE_1: nodes['LACE_1'], LACE_2: nodes['LACE_2'] }), [nodes])
  return (
    <Merged castShadow receiveShadow meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function Kicks(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.004 : 0));
  const instances = useContext(context)
  return (
    <group {...props} dispose={null} onClick={(e) => setSpin(!spin)} ref={mesh}>
      <group position={[0, 0.0, 0]}>
        <instances.LACE color={props.mesh} />
        <instances.LACE_1 color={props.stripes} />
        <instances.LACE_2 color={props.sole} />
      </group>
    </group>
  );
}
import { useGLTF, Merged } from '@react-three/drei'
import { useRef, useState, createContext, useMemo, useContext } from 'react'
import { useFrame } from '@react-three/fiber';

const context = createContext()

export function WomenPantsInstances({ children, ...props }) {
  const { nodes } = useGLTF('/models/women-pants/women-pants-transformed.glb')
  const instances = useMemo(() => ({ Plane: nodes['Plane'], Plane_1: nodes['Plane_1'], Plane_2: nodes['Plane_2'] }), [nodes])
  return (
    <Merged castShadow receiveShadow meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export function WomenPants(props) {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.006 : 0));
  const instances = useContext(context)
  return (
    <group {...props} dispose={null} onClick={(e) => setSpin(!spin)} ref={mesh}>
      <group position={[0, 0.2, 0.16]} rotation={[Math.PI / 2, 0, 0]} scale={[0.32, 0.32, 0.2]}>
        <instances.Plane color={props.mesh} />
        <instances.Plane_1 color={props.stripes} />
        <instances.Plane_2 color={props.sole} />
      </group>
    </group>
  );
}
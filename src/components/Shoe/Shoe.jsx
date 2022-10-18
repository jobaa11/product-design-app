import { useRef, createContext, useMemo, useContext } from 'react';
import { useGLTF, Merged } from '@react-three/drei';

const context = createContext();
export function ShoeInstances({ children, ...props }) {
  const { nodes } = useGLTF('/shoe/shoe.gltf');
  const instances = useMemo(
    () => ({ mat1: nodes['Model_material0_0'] }),
    [nodes]
    );
  return (
    <Merged castShadow meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}


export function Shoe(props) {
  const instances = useContext(context);
  const mesh = useRef(null);
  return (
    <group  receiveShadow {...props} dispose={null} ref={mesh}>
      <instances.mat1 />
    </group>
  );
}

useGLTF.preload('/shoe/shoe.gltf');

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Sweater = (props) => {
  const [spin, setSpin] = useState(true)
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += spin ? 0.006 : 0));
  const { nodes, materials } = useGLTF('/sweater/sweater.gltf');
  return (
    <group onClick={(e) => setSpin(!spin)} {...props} dispose={null} ref={mesh}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -1, 0.0]} scale={0.0045}>
            <mesh
              castShadow
              geometry={nodes.Object_4.geometry}
              material={materials.WORLD_ZIP_HOODIE}
            />
            <mesh
              castShadow
              geometry={nodes.Object_5.geometry}
              material={materials.WORLD_ZIP_HOODIE}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/sweater/sweater.gltf');
export default Sweater;

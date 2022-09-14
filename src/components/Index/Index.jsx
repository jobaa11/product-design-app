import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Lights from '../../components/Lights/Lights';
import {
  OrbitControls,
  softShadows,
  Html,
  useProgress,
  useGLTF,
} from '@react-three/drei';
softShadows();

const Shoe = (props) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.006));
  const { nodes } = useGLTF('/shoe/shoe.gltf');

  return (
    <group receiveShadow {...props} dispose={null} ref={mesh}>
      <mesh
        position={[0.001, 0, 8]}
        castShadow
        geometry={nodes.Model_material0_0.geometry}
      >
        <meshStandardMaterial color='pink' transparent />
      </mesh>
    </group>
  );
};

export default function Index() {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
  return (
    <>
      <Canvas
        shadows
        className='canvas'
        linear
        camaera={{ position: [-5, 2, 10], fov: 70 }}
      >
        <Suspense fallback={<Loader />}>
          <Lights />
          <OrbitControls />
          <Shoe />
        </Suspense>
      </Canvas>
    </>
  );
}

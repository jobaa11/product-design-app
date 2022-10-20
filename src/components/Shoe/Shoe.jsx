import { useGLTF } from '@react-three/drei';

export default function Shoe(props) {
  const { nodes } = useGLTF('/shoe/shoe.gltf');
  return (
    <group receiveShadow {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Model_material0_0.geometry}
      >
        <meshStandardMaterial color={props.mesh} transparent />
      </mesh>
    </group>
  );
};

useGLTF.preload('/shoe/shoe.gltf');

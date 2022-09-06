import { Section } from "../Sections/Sections";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Model = (props, { modelName }) => {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.006));
    const { nodes } = useGLTF('/scene.gltf')
    return (
      <Section factor={1.5}>
        <group {...props} dispose={null} ref={mesh}>
          <mesh position={[0, 0, 8]} castShadow geometry={nodes.Model_material0_0.geometry}  >
            <meshStandardMaterial attach='material' color='lightpink' transparent />
          </mesh>
        </group>
      </Section>
    );
  };
  
  const ModelView = ({ children, modelName, position }) => {
    return (
      <Section factor={1.5}>
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={.3} />
          </mesh>
        </group>
        {/* <Box /> */}
        <Model className='models' />
      </Section>
    );
  };

  export default ModelView;
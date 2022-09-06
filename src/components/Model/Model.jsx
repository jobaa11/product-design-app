import { Section } from "../Sections/Sections";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as Mesh from "../../pages/NewModelPage/NewModelPage";


const Shoe = (props) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.006));
  const { nodes } = useGLTF('/shoe/shoe.gltf')
  return (
    <Section factor={1.5}>
      <group {...props} dispose={null} ref={mesh}>
        <mesh position={[0, 0, 8]} castShadow geometry={nodes.Model_material0_0.geometry}  >
          <meshStandardMaterial attach='material' color={props.customColors.mesh} transparent />
        </mesh>
      </group>
    </Section>
  );
};

const Jacket = (props) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += 0.006));
  const { nodes, materials } = useGLTF('/jacket/jacket.gltf')
  return (
    <group {...props} dispose={null} ref={mesh}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
          <mesh castShadow geometry={nodes.jacket_low_Fabric_0.geometry} material={materials.Fabric} />
          <mesh castShadow geometry={nodes.zipper_tab_low_Metal_0.geometry} material={materials.Metal} />
          <mesh castShadow geometry={nodes.zipper_slider_low_Metal_0.geometry} material={materials.Metal} />
        </group>
      </group>
    </group>
  );
}

const Sweater = (props) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y += 0.006));
  const { nodes, materials } = useGLTF('/sweater/sweater.gltf')
  return (
    <group {...props} dispose={null} ref={mesh}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -1, 0.01]} scale={.0045}>
            <mesh castShadow geometry={nodes.Object_4.geometry} material={materials.WORLD_ZIP_HOODIE} />
            <mesh castShadow geometry={nodes.Object_5.geometry} material={materials.WORLD_ZIP_HOODIE} />
          </group>
        </group>
      </group>
    </group>
  );
}

const ModelView = () => {
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
      <Shoe customColors={{ mesh: 'lightpink', stripes: 'blue', sole: 'white' }}  />
      {/* <Sweater /> */}
      {/* <Jacket /> */}
    </Section>
  );
};

export default ModelView;
export { Jacket, Shoe, Sweater }

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

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

  export default Sweater;
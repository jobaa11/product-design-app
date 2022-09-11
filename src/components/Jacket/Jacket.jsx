import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const Jacket = (props) => {
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
// export const Jacket = (props) => {
//     const mesh = useRef(null);
//     useFrame(() => (mesh.current.rotation.y += 0.006));
//     const { nodes, materials } = useGLTF('/jacket/jacket.gltf')
//     return (
//       <group {...props} dispose={null} ref={mesh}>
//         <group rotation={[-Math.PI / 2, 0, 0]}>
//           <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
//             <mesh castShadow geometry={nodes.jacket_low_Fabric_0.geometry} material={materials.Fabric} />
//             <mesh castShadow geometry={nodes.zipper_tab_low_Metal_0.geometry} material={materials.Metal} />
//             <mesh castShadow geometry={nodes.zipper_slider_low_Metal_0.geometry} material={materials.Metal} />
//           </group>
//         </group>
//       </group>
//     );
//   }
  useGLTF.preload('/jacket/jacket.gltf')
  
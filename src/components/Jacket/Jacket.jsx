import { createContext, useMemo, useContext, useRef  } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Merged } from "@react-three/drei";



const context = createContext()

export function JacketInstances({ children, ...props }) {
  const { nodes, materials } = useGLTF('/jacket/jacket.gltf')
  const instances = useMemo(() => ({ mat1: nodes['jacket_low_Fabric_0'], mat2: nodes['zipper_tab_low_Metal_0'], mat3: nodes['zipper_slider_low_Metal_0'] }), [nodes, materials])
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export const Jacket = (props) => {
  const instances = useContext(context)
  // const mesh = useRef(null);
  // useFrame(() => (mesh.current.rotation.y += 0.006));
  return (
    <group {...props} dispose={null} >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
          <instances.mat1 />
          <instances.mat2 />
          <instances.mat3 />
        </group>
      </group>
    </group>
  );
}



// export const Jacket = (props) => {
//   const meshes = useRef(null);
//   useFrame(() => (meshes.current.rotation.y += 0.006));
//   const { nodes, materials } = useGLTF('/jacket/jacket.gltf')
//   return (
//     <group {...props} dispose={null} ref={meshes}>
//       <group rotation={[-Math.PI / 2, 0, 0]}>
//         <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
//           <AllMesh nodes={nodes} materials={materials}/>
//           {/* <mesh castShadow geometry={nodes.jacket_low_Fabric_0.geometry} material={materials.Fabric}/>
//           <mesh castShadow geometry={nodes.zipper_tab_low_Metal_0.geometry} material={materials.Metal} />
//           <mesh castShadow geometry={nodes.zipper_slider_low_Metal_0.geometry} material={materials.Metal} /> */}
//         </group>
//       </group>
//     </group>
//   );
// }
useGLTF.preload('/jacket/jacket.gltf')

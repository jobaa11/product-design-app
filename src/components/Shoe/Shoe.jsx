import { useRef, createContext, useMemo, useContext } from "react";
// import { useFrame } from "@react-three/fiber";
import { useGLTF, Merged } from "@react-three/drei";



const context = createContext()
export function Instances({ children, ...props }) {
    const { nodes } = useGLTF('/shoe/shoe.gltf');
    const instances = useMemo(() => ({ mat1: nodes['Model_material0_0'] }), [nodes])
    return (
        <Merged castShadow meshes={instances} {...props}>
            {(instances) => <context.Provider value={instances} children={children} />}
        </Merged>
    )
}

export function Shoe(props) {
    const instances = useContext(context)
    const mesh = useRef(null);
    // useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.006));
    return (
        <group receiveShadow  {...props} dispose={null} ref={mesh}>
            <instances.mat1 /> 
            {/* position={[0.001, -7, 15]} */}
        </group>

    );
}
// const Shoe = (props) => {
//     // const [color, setColor] = useState('pink');
//     const mesh = useRef(null);
//     useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.006));
//     const { nodes } = useGLTF('/shoe/shoe.gltf')

//     return (
//         <group receiveShadow {...props} dispose={null} ref={mesh}>
//             <mesh position={[0.001, 0, 8]}  castShadow geometry={nodes.Model_material0_0.geometry}  >
//                 <meshStandardMaterial color='pink' transparent />
//             </mesh>
//         </group>

//     );
// };

useGLTF.preload('/shoe/shoe.gltf')
// export default Shoe;

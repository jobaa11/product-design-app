import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Shoe = (props, textures) => {
    // const [color, setColor] = useState('pink');
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.z = mesh.current.rotation.y += 0.006));
    const { nodes } = useGLTF('/shoe/shoe.gltf')

    return (
        <group receiveShadow {...props} dispose={null} ref={mesh}>
            <mesh position={[0, 0, 8]}  castShadow geometry={nodes.Model_material0_0.geometry}  >
                <meshStandardMaterial color='pink' transparent />
            </mesh>
        </group>

    );
};

export default Shoe;

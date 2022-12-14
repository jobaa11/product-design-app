import { softShadows } from '@react-three/drei';
softShadows();

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.7}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0.002, -3, 0.002]}
        >
          <planeGeometry attach='geometry' args={[100, 100]} />
          <shadowMaterial attach='material' opacity={0.3} />
        </mesh>
      </group>
    </>
  );
};

export default Lights;

import Scene from "../Scene/Scene";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Shoe from "../../components/Shoe/Shoe";
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function NewModelPage(props) {
  const [mesh, setMesh] = useState('#ffffff')
  const [stripes, setStripes] = useState('#C78f8f')
  const [sole, setSole] = useState('#A5CFE1')
  const { nodes } = useGLTF('/jacket/jacket.gltf')


function handleSubmit() {

}

  return (
    <><form className='new-model' onSubmit={handleSubmit}>
      <div className='wrapper'>
        
        <div className='card'>
          <div className="product-canvas">
            <Canvas shadows

              camaera={{ position: [-5, 2, 10], fov: 70 }}>
              <group>
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -3, 2]}>
                  <planeBufferGeometry attach='geometry' args={[100, 100]} />
                  <shadowMaterial attach='material' opacity={.3} />
                </mesh>
              </group>
              <Shoe />

              <Lights />
              <OrbitControls />
            </Canvas >
          </div>
          <h3> Choose Color</h3>
          <div className='colors'>
            <div>
              <input type="color" id='mesh' name='mesh' value={mesh} onChange={(e) => setMesh(e.target.value)} />
              <label htmlFor='mesh'>Main</label>
            </div>
            <div>
              <input type='color' id='stripes' name='stripes' value={stripes} onChange={(e) => setStripes(e.target.value)} />
              <label htmlFor="stripes">Stripes</label>
            </div>
            <div>
              <input type='color' id='sole' name='sole' value={sole} onChange={(e) => setSole(e.target.value)} />
              <label htmlFor="sole">Sole</label>
            </div>
          </div>
        </div>
      </div>
      <label htmlFor='type'></label>
       </form>
      <button type="submit">Create Design</button>
      {/* <input name='name'/> */}
    </>
  );
}

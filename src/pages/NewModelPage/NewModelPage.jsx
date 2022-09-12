import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Shoe, ShoeInstances } from "../../components/Shoe/Shoe";
// import { Jacket, JacketInstances } from '../../components/Jacket/Jacket'
import Sweater from '../../components/Sweater/Sweater'
import Lights from "../../components/Lights/Lights";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as modelsApi from '../../utilities/models-api'
import { useNavigate } from "react-router-dom";

const Jacket = ({...props}) => {
  // const meshes = useRef(null);
  // useFrame(() => (meshes.current.rotation.y += 0.006));
  const { nodes, materials } = useGLTF('/jacket/jacket.gltf')
  return (
    <group {...props} dispose={null} >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
          <mesh castShadow geometry={nodes.jacket_low_Fabric_0.geometry} material-color={props.colors.mesh}/>
          <mesh castShadow geometry={nodes.zipper_tab_low_Metal_0.geometry} material={props.colors.stripes} />
          <mesh castShadow geometry={nodes.zipper_slider_low_Metal_0.geometry} material={props.colors.sole} />
        </group>
      </group>
    </group>
  );
}

export default function NewModelPage({ models, setModels, context }) {
  const [modelData, setModelData] = useState({
    mesh: '#ffffff',
    stripes: '#C78f8f',
    sole: '#A5CFE1',
    name: '',
    product: '/shoe/shoe.gltf',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setModelData({ ...modelData, [evt.target.name]: evt.target.value })
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let model = await modelsApi.newModel(modelData)
      setModelData(model)
      navigate('/portfolio')
      setModels({ ...models, model })
    } catch (e) {
      let err = new Error(e)
      console.log(err)
    };
  };

  


  return (
    <>
      <form className='new-model' onSubmit={handleSubmit}>
        <div className='wrapper'>
          <div className='card'>
            <div className="product-canvas">
              <Canvas shadows
                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <group className="invisible-plane">
                  <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -3.002, 2]}>
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' opacity={.3} />
                  </mesh>
                </group>
                {
                  // modelData.product === '/shoe/shoe.gltf' ? <Shoe textures={modelData.mesh} />
                  modelData.product === '/shoe/shoe.gltf' ? <ShoeInstances>
                    <Shoe castShadow position={[0.001, 0, 8]} />
                    <meshStandardMaterial color={modelData.mesh} transparent />
                  </ShoeInstances>
                    // : modelData.product === '/jacket/jacket.gltf' ? <Jacket />
                    : modelData.product === '/jacket/jacket.gltf' ? 
                      <Jacket castShadow colors={{mesh:modelData.mesh, stripes: modelData.stripes, sole: modelData.sole}}/>

                      : modelData.product === '/sweater/sweater.gltf' ? <Sweater /> : <Shoe />
                }
                <Lights />
                <OrbitControls />
              </Canvas >
            </div>
            <h3> Choose Color</h3>
            <div className='colors'>
              <div>
                <input type="color" id='mesh' name='mesh' value={modelData.mesh} onChange={handleChange} />
                <label htmlFor='mesh'>Main</label>
              </div>
              <div>
                <input type='color' id='stripes' name='stripes' value={modelData.stripes} onChange={handleChange} />
                <label htmlFor="stripes">Stripes</label>
              </div>
              <div>
                <input type='color' id='sole' name='sole' value={modelData.sole} onChange={handleChange} />
                <label htmlFor="sole">Sole</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="product">Design</label>
            <select type='color' id='product' name='product' value={modelData.product} onChange={handleChange}>
              <option value="/shoe/shoe.gltf">Shoe</option>
              <option value="/sweater/sweater.gltf">Sweater</option>
              <option value="/jacket/jacket.gltf">Jacket</option>
            </select>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type='text' id='name' name='name' value={modelData.name} required onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea maxLength={25} type='text' id='description' name='description' value={modelData.description} onChange={handleChange} />
          </div>
          <button className="create-model-btn" type="submit">Create Design</button>
        </div>
      </form>
    </>
  );
}

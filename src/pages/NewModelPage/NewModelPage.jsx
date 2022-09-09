import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Shoe from "../../components/Shoe/Shoe";
import Jacket from '../../components/Jacket/Jacket'
import Sweater from '../../components/Sweater/Sweater'
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";
import * as modelsApi from '../../utilities/models-api'
import { useNavigate } from "react-router-dom";

export default function NewModelPage(props) {
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
  }

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let model = await modelsApi.newModel(modelData)
      setModelData(model)
      navigate('/portfolio')
    } catch (e) {
      let err = new Error(e)
      console.log(err)
    }
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
              {modelData.product === '/shoe/shoe.gltf' ? <Shoe textures={modelData.mesh}/>
                : modelData.product === '/jacket/jacket.gltf' ? <Jacket />
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
          <textarea type='text' id='description' name='description' value={modelData.description} onChange={handleChange} />
        </div>
        <button className="create-model-btn" type="submit">Create Design</button>
      </div>
    </form>
    </>
  );
}

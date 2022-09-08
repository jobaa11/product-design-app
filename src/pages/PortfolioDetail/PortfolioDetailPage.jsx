import { Canvas } from "@react-three/fiber";
import Lights from "../../components/Lights/Lights";
import { OrbitControls } from "@react-three/drei";
import Jacket from "../../components/Jacket/Jacket";
import Sweater from "../../components/Sweater/Sweater";
import Shoe from "../../components/Shoe/Shoe";
import { useState, useEffect } from 'react'
import * as modelsApi from '../../utilities/models-api'


export default function PortfolioDetailPage(user) {
    const [models, setModels] = useState([]);

    
    useEffect(function () {
        async function getModels() {
            const models = await modelsApi.edit(user);
            setModels(models);
        }
        getModels();
    }, []);
    

    const handleChange = (evt) => {
        setModels({ ...models, [evt.target.name]: evt.target.value })
      }

    
      const handleSubmit = async (evt) => {
        try {
          evt.preventDefault();
          let model = await modelsApi.edit(models)
          setModels(model)
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
                {models.product === '/shoe/shoe.gltf' ? <Shoe textures={models.mesh}/>
                  : models.product === '/jacket/jacket.gltf' ? <Jacket />
                    : models.product === '/sweater/sweater.gltf' ? <Sweater /> : <Shoe />
  
                }
                <Lights />
                <OrbitControls />
              </Canvas >
            </div>
            <h3> Choose Color</h3>
            <div className='colors'>
              <div>
                <input type="color" id='mesh' name='mesh' value={models.mesh} onChange={handleChange} />
                <label htmlFor='mesh'>Main</label>
              </div>
              <div>
                <input type='color' id='stripes' name='stripes' value={models.stripes} onChange={handleChange} />
                <label htmlFor="stripes">Stripes</label>
              </div>
              <div>
                <input type='color' id='sole' name='sole' value={models.sole} onChange={handleChange} />
                <label htmlFor="sole">Sole</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="product">Design</label>
            <select type='color' id='product' name='product' value={models.product} onChange={handleChange}>
              <option value="/shoe/shoe.gltf">Shoe</option>
              <option value="/sweater/sweater.gltf">Sweater</option>
              <option value="/jacket/jacket.gltf">Jacket</option>
            </select>
          </div>
          <div>
            {models.name}
            <label htmlFor="name">Name</label>
            <input type='text' id='name' name='name' value={models.name} required onChange={handleChange} />
          </div>
          <button>Edit Name</button>
          <div>
            <label htmlFor="description">Description</label>
            <textarea type='text' id='description' name='description' value={models.description} onChange={handleChange} />
          </div>
          <button className="create-model-btn" type="submit">Update Design</button>
        </div>
      </form>
     
      </>
    )
}
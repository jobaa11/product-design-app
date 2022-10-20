import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as modelsApi from '../../utilities/models-api';
import Shoe from '../../components/Shoe/Shoe';
import Hoodie from '../../components/Hoodie/Hoodie';
import Skirt from '../../components/Skirt/Skirt';
import Kicks from '../../components/Kicks/Kicks';
import WomenShirt from '../../components/WomenShirt/WomenShirt';
import WomenPants from '../../components/WomenPants/WomenPants';
import Sweater from '../../components/Sweater/Sweater';
import Shirt from '../../components/Shirt/Shirt';
import Lights from '../../components/Lights/Lights';





export default function NewModelPage({ models, setModels, context }) {
  const [modelData, setModelData] = useState({
    mesh: '#ffffff',
    stripes: '#C78f8f',
    sole: '#A5CFE1',
    name: '',
    product: '/shoe/shoe.gltf',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setModelData({ ...modelData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let model = await modelsApi.newModel(modelData);
      setModelData(model);
      navigate('/portfolio');
      setModels([model, ...models]);
    } catch (e) {
      let err = new Error(e);
      console.log(err);
    }
  };

  return (
    <>
      <form className='new-model' onSubmit={handleSubmit}>
        <div className='new-wrapper'>
          <div className='new-card'>
            <div className='product-canvas'>
              <Canvas shadows camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <group className='invisible-plane'>
                  <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -3.002, 2]}
                  >
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' opacity={0.3} />
                  </mesh>
                </group>
                {modelData.product === '/shoe/shoe.gltf' ? (
                  <Shoe castShadow mesh={modelData.mesh} />
                ) : modelData.product === '/hoodie/hoodie.gltf' ? (
                  <Hoodie
                    mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                ) : modelData.product === '/skirt/skirt.gltf' ? (
                  <Skirt mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                ) : modelData.product === '/kicks/kicks.gltf' ? (
                  <Kicks mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                ) : modelData.product === '/women-shirt/women-shirt.gltf' ? (
                  <WomenShirt mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                ) : modelData.product === '/shirt/shirt.gltf' ? (
                  <Shirt mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                ) : modelData.product === '/women-pants/women-pants.gltf' ? (
                  <WomenPants scale={4.5} mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                ) : (
                  <Hoodie mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
                )}
                <Lights />
                <OrbitControls />
              </Canvas>
            </div>
            <h3> Choose Color</h3>
            <div className='colors'>
              <div>
                <input
                  type='color'
                  id='mesh'
                  name='mesh'
                  value={modelData.mesh}
                  onChange={handleChange}
                />
                <label htmlFor='mesh'>Main</label>
              </div>
              <div>
                <input
                  type='color'
                  id='stripes'
                  name='stripes'
                  value={modelData.stripes}
                  onChange={handleChange}
                />
                <label htmlFor='stripes'>Stripes</label>
              </div>
              <div>
                <input
                  type='color'
                  id='sole'
                  name='sole'
                  value={modelData.sole}
                  onChange={handleChange}
                />
                <label htmlFor='sole'>Sole</label>
              </div>
            </div>
          </div>
          <div className='new-model-card'>
            <div>
              <label htmlFor='product'>Design</label>
              <select
                type='color'
                id='product'
                name='product'
                value={modelData.product}
                onChange={handleChange}
              >
                <option value='/shoe/shoe.gltf'>Shoe</option>
                <option value='/hoodie/hoodie.gltf'>Hoodie</option>
                <option value='/women-shirt/women-shirt.gltf'>Shirt (W)</option>
                <option value='/shirt/shirt.gltf'>Shirt (M)</option>
                <option value='/skirt/skirt.gltf'>Skirt</option>
                <option value='/women-pants/women-pants.gltf'>Leggings (W)</option>
                <option value='/kicks/kicks.gltf'>Kicks</option>
              </select>
            </div>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={modelData.name}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea
                placeholder='12 max chars'
                maxLength={12}
                type='text'
                id='description'
                name='description'
                required
                value={modelData.description}
                onChange={handleChange}
              />
            </div>
            <button className='create-model-btn' type='submit'>
              Create Design
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

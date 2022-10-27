import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as modelsApi from '../../utilities/models-api';
import Hoodie from '../../components/Hoodie/Hoodie';
import Skirt from '../../components/Skirt/Skirt';
import Kicks from '../../components/Kicks/Kicks';
import WomenShirt from '../../components/WomenShirt/WomenShirt';
import WomenPants from '../../components/WomenPants/WomenPants';
import Shirt from '../../components/Shirt/Shirt';
import Lights from '../../components/Lights/Lights';


export default function NewModelPage({ models, setModels }) {
  const [modelData, setModelData] = useState({
    mesh: '#ffffff',
    stripes: '#C78f8f',
    sole: '#A5CFE1',
    name: '',
    product: '/hoodie/hoodie.gltf',
    description: '',
  });



  const limit = models.length >= 5;

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
      <Canvas style={{ height: '80%' }} shadows camaera={{ position: [-5, 2, 10], fov: 70 }}>
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
        {modelData.product === '/hoodie/hoodie.gltf' ? (
          <Hoodie mesh={modelData.mesh} stripes={modelData.stripes} sole={modelData.sole} />
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
        <Html style={{ left: '-120px', top: '120px' }} className='description-label' as='div'>
          <input
            hidden={limit ? true : false}
            style={{ backgroundColor: 'white', opacity: '0.7' }}
            placeholder='Name'
            type='text'
            id='name'
            name='name'
            value={modelData.name}
            required
            onChange={handleChange}
          />
          <input
            hidden={limit ? true : false}
            style={{ backgroundColor: 'white', opacity: '0.7' }}
            placeholder='Description'
            maxLength={12}
            type='text'
            id='description'
            name='description'
            required
            value={modelData.description}
            onChange={handleChange}
          />
        </Html>
      </Canvas>
      <form className='new-model' onSubmit={handleSubmit}>
        <div>
          <button hidden={limit ? true : false} className='create-model-btn' type={'submit'}>
            create
          </button>
          <div>
            <input hidden
              placeholder='Name'
              type='text'
              id='name'
              name='name'
              value={modelData.name}
              required
              onChange={handleChange}
            />
            <input hidden
              placeholder='Description'
              maxLength={12}
              type='text'
              id='description'
              name='description'
              required
              value={modelData.description}
              onChange={handleChange}
            />
          </div>
          <select hidden={limit ? true : false}
            className='new-model-select'
            type='color'
            id='product'
            name='product'
            value={modelData.product}
            onChange={handleChange}
          >
            <option value='/hoodie/hoodie.gltf'>Hoodie</option>
            <option value='/women-shirt/women-shirt.gltf'>Shirt (W)</option>
            <option value='/shirt/shirt.gltf'>Shirt (M)</option>
            <option value='/skirt/skirt.gltf'>Skirt</option>
            <option value='/women-pants/women-pants.gltf'>Leggings (W)</option>
            <option value='/kicks/kicks.gltf'>Kicks</option>
          </select>
        </div>
        <div className='new-colors'>
          <div>
            <input
              hidden={limit ? true : false}
              type='color'
              id='mesh'
              name='mesh'
              value={modelData.mesh}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              hidden={limit ? true : false}
              type='color'
              id='stripes'
              name='stripes'
              value={modelData.stripes}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              hidden={limit ? true : false}
              type='color'
              id='sole'
              name='sole'
              value={modelData.sole}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ color: limit ? 'black' : 'white', position: 'relative', top: '50px' }}>{limit ? 'You have reached your max of 5 models. Please remove a model and try again.' : 'click to stop rotation - click & hold to spin model'}</div>
      </form>
    </>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as portfolioAPI from '../../utilities/portfolio-api';
import { HoodieInstances, Hoodie } from '../../components/Hoodie/Hoodie';
import { SkirtInstances, Skirt } from '../../components/Skirt/Skirt';
import { KicksInstances, Kicks } from '../../components/Kicks/Kicks';
import { WomenShirtInstances, WomenShirt } from '../../components/WomenShirt/WomenShirt';
import { WomenPantsInstances, WomenPants } from '../../components/WomenPants/WomenPants';
import { ShirtInstances, Shirt } from '../../components/Shirt/Shirt';
import Lights from '../../components/Lights/Lights';

export default function ModelUpdate(props) {
  let { id } = useParams();

  useEffect(
    function () {
      async function getModel(id) {
        const object = props.models.filter((model) => model._id === id);
        setModelUpdate(...object);
      }
      getModel(id);
    },
    [props.models, id]
  );

  const [modelUpdate, setModelUpdate] = useState({
    mesh: '',
    stripes: '',
    sole: '',
    name: '',
    product: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setModelUpdate({ ...modelUpdate, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let model = await portfolioAPI.edit(id, modelUpdate);
      setModelUpdate(model);
      const currentModels = props.models.filter((m) => m._id !== model._id);
      props.setModels([model, ...currentModels]);
      navigate('/portfolio');
    } catch (e) {
      let err = new Error(e);
      console.error(err);
    }
  };

  return (
    <>
      <Canvas style={{ height: '80%' }} shadows camaera={{ position: [-5, 2, 10], fov: 70 }}>
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3.003, 2]}
          >
            <planeGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>

        </group>
        {modelUpdate.product === '/hoodie/hoodie.gltf' ? (
          <HoodieInstances>
            <Hoodie mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
          </HoodieInstances>
        ) : modelUpdate.product === '/skirt/skirt.gltf' ? (
          <SkirtInstances>
            <Skirt mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
          </SkirtInstances>
        ) : modelUpdate.product === '/kicks/kicks.gltf' ? (
          <KicksInstances>
            <Kicks mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
          </KicksInstances>
        ) : modelUpdate.product === '/women-shirt/women-shirt.gltf' ? (
          <WomenShirtInstances>
            <WomenShirt mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
          </WomenShirtInstances>
        ) : modelUpdate.product === '/shirt/shirt.gltf' ? (
          <ShirtInstances>
            <Shirt mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
          </ShirtInstances>
        ) : modelUpdate.product === '/women-pants/women-pants.gltf' ? (
          <WomenPantsInstances>
            <WomenPants scale={4.5} mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={ModelUpdate.sole} />
          </WomenPantsInstances>
        ) : (
          <HoodieInstances>
            <Hoodie mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
          </HoodieInstances>
        )}
        <Lights />
        <OrbitControls />
        <Html style={{ left: '-120px', top: '120px' }} className='description-label' as='div'>
          <input
            placeholder='Name'
            type='text'
            id='name'
            name='name'
            value={modelUpdate.name}
            required
            onChange={handleChange}
          />
          <input
            placeholder='Description'
            maxLength={12}
            type='text'
            id='description'
            name='description'
            required
            value={modelUpdate.description}
            onChange={handleChange}
          />
        </Html>
      </Canvas>
      <form className='new-model' onSubmit={handleSubmit}>
        <div>

          <button className='create-model-btn' type='submit'>
            update
          </button>
          <div className='description-label'>
            <input hidden
              placeholder='Name'
              type='text'
              id='name'
              name='name'
              value={modelUpdate.name}
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
              value={modelUpdate.description}
              onChange={handleChange}
            />
          </div>

          <select
            className='new-model-select'
            type='color'
            id='product'
            name='product'
            value={modelUpdate.product}
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
              type='color'
              id='mesh'
              name='mesh'
              value={modelUpdate.mesh}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type='color'
              id='stripes'
              name='stripes'
              value={modelUpdate.stripes}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type='color'
              id='sole'
              name='sole'
              value={modelUpdate.sole}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </>
  );
}

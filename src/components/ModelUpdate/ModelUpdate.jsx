import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as portfolioAPI from '../../utilities/portfolio-api';
import Shoe from '../../components/Shoe/Shoe';
import { Jacket } from '../../components/Jacket/Jacket';
import Sweater from '../../components/Sweater/Sweater';
import Hoodie from '../../components/Hoodie/Hoodie';
import Skirt from '../../components/Skirt/Skirt';
import Kicks from '../../components/Kicks/Kicks';
import WomenShirt from '../../components/WomenShirt/WomenShirt';
import WomenPants from '../../components/WomenPants/WomenPants';
import Shirt from '../../components/Shirt/Shirt';
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
                <group>
                  <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -3.003, 2]}
                  >
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' opacity={0.3} />
                  </mesh>
                </group>
                {modelUpdate.product === '/shoe/shoe.gltf' ? (
                  <Shoe castShadow mesh={modelUpdate.mesh} />
                ) : modelUpdate.product === '/hoodie/hoodie.gltf' ? (
                  <Hoodie
                    mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
                ) : modelUpdate.product === '/skirt/skirt.gltf' ? (
                  <Skirt mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
                ) : modelUpdate.product === '/kicks/kicks.gltf' ? (
                  <Kicks mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
                ) : modelUpdate.product === '/women-shirt/women-shirt.gltf' ? (
                  <WomenShirt mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
                ) : modelUpdate.product === '/shirt/shirt.gltf' ? (
                  <Shirt mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={modelUpdate.sole} />
                ) : modelUpdate.product === '/women-pants/women-pants.gltf' ? (
                  <WomenPants scale={4.5} mesh={modelUpdate.mesh} stripes={modelUpdate.stripes} sole={ModelUpdate.sole} />
                ) : (
                  <Shoe />
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
                  value={modelUpdate.mesh}
                  onChange={handleChange}
                />
                <label htmlFor='mesh'>Main</label>
              </div>
              <div>
                <input
                  type='color'
                  id='stripes'
                  name='stripes'
                  value={modelUpdate.stripes}
                  onChange={handleChange}
                />
                <label htmlFor='stripes'>Stripes</label>
              </div>
              <div>
                <input
                  type='color'
                  id='sole'
                  name='sole'
                  value={modelUpdate.sole}
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
                value={modelUpdate.product}
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
                value={modelUpdate.name}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea
                maxLength={12}
                type='text'
                id='description'
                name='description'
                value={modelUpdate.description}
                onChange={handleChange}
              />
            </div>
            <button className='create-model-btn' type='submit'>
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

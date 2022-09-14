import { useState, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Shoe, ShoeInstances } from '../../components/Shoe/Shoe';
// import Pants from '../../components/Pants/Pants'
import Sweater from '../../components/Sweater/Sweater';
import Lights from '../../components/Lights/Lights';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as modelsApi from '../../utilities/models-api';
import { useNavigate } from 'react-router-dom';

const Jacket = ({ ...props }) => {
  const { nodes } = useGLTF('/jacket/jacket.gltf');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]} scale={1}>
          <mesh
            castShadow
            geometry={nodes.jacket_low_Fabric_0.geometry}
            material-color={props.colors.mesh}
          />
          <mesh
            castShadow
            geometry={nodes.zipper_tab_low_Metal_0.geometry}
            material={props.colors.stripes}
          />
          <mesh
            castShadow
            geometry={nodes.zipper_slider_low_Metal_0.geometry}
            material={props.colors.sole}
          />
        </group>
      </group>
    </group>
  );
};


//  function Kicks({...props}) {
//     const mesh = useRef(null);
//   useFrame(() => (mesh.current.rotation.y += 0.006));
//   const { nodes } = useGLTF('/kicks/kicks.gltf')
//   return (
//     <group {...props} dispose={null} ref={mesh}>
//       <mesh castShadow geometry={nodes.TOP.geometry} material-color={props.colors.mesh} scale={[0.76, 1.14, 1.45]} />
//       <mesh castShadow geometry={nodes.MID.geometry} material-color={props.colors.stripes} scale={[0.76, 1.14, 1.45]} />
//       <mesh castShadow geometry={nodes.LACES.geometry} material-color={props.colors.sole} position={[0.39, 0.72, 0.34]} />
//     </group>
//   )
// }




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
          <div className='card'>
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
                  <ShoeInstances>
                    <Shoe castShadow position={[0.001, 0, 8]} />
                    <meshStandardMaterial color={modelData.mesh} transparent />
                  </ShoeInstances>
                ) : modelData.product === '/jacket/jacket.gltf' ? (
                  <Jacket
                    castShadow
                    colors={{
                      mesh: modelData.mesh,
                      stripes: modelData.stripes,
                      sole: modelData.sole,
                    }}
                    />
                    ) : modelData.product === '/sweater/sweater.gltf' ? (
                      <Sweater                  
                    castShadow
                    colors={{
                    mesh: modelData.mesh,
                    stripes: modelData.stripes,
                    sole: modelData.sole,
                  }}
                   />
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
                <option value='/sweater/sweater.gltf'>Hoodie</option>
                <option value='/jacket/jacket.gltf'>Jacket</option>
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

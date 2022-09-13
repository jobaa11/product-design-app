import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as portfolioAPI from '../../utilities/portfolio-api'
import { Shoe, ShoeInstances } from "../../components/Shoe/Shoe";
import { Jacket } from '../../components/Jacket/Jacket'
import Sweater from '../../components/Sweater/Sweater'
import Lights from "../../components/Lights/Lights";

export default function ModelUpdate(props, models) {
  let { id } = useParams();


  useEffect(function () {
    async function getModel(id) {
      const object = props.models.filter((model) => model._id === id);
      setModelUpdate(...object);
    }
    getModel(id);
  }, [props.models, id]);

  const [modelUpdate, setModelUpdate] = useState({
    mesh: '',
    stripes: '',
    sole: '',
    name: '',
    product: '',
    description: ''
  });

  const navigate = useNavigate();


  const handleChange = (evt) => {
    setModelUpdate({ ...modelUpdate, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let model = await portfolioAPI.edit(id, modelUpdate)
      setModelUpdate(model)
      const currentModels = props.models.filter((m) => m._id !== model._id)
      props.setModels([model, ...currentModels])
      navigate('/portfolio')
    } catch (e) {
      let err = new Error(e)
      console.log(err)
    }
  }
  console.log(props.models, 'hello')

  return (
    <>
      <form className='new-model' onSubmit={handleSubmit}>
        <div className='wrapper'>

          <div className='card'>
            <div className="product-canvas">
              <Canvas shadows
                camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <group>
                  <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -3.003, 2]}>
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' opacity={.3} />
                  </mesh>
                </group>
                {modelUpdate.product === '/shoe/shoe.gltf' ? <ShoeInstances><Shoe castShadow position={[0.001, 0, 8]} />
                  <meshStandardMaterial color={modelUpdate.mesh} /></ShoeInstances>
                  : modelUpdate.product === '/jacket/jacket.gltf' ? <Jacket />
                    : modelUpdate.product === '/sweater/sweater.gltf' ? <Sweater /> : <Shoe />
                }
                <Lights />
                <OrbitControls />
              </Canvas >
            </div>
            <h3> Choose Color</h3>
            <div className='colors'>
              <div>
                <input type="color" id='mesh' name='mesh' value={modelUpdate.mesh} onChange={handleChange} />
                <label htmlFor='mesh'>Main</label>
              </div>
              <div>
                <input type='color' id='stripes' name='stripes' value={modelUpdate.stripes} onChange={handleChange} />
                <label htmlFor="stripes">Stripes</label>
              </div>
              <div>
                <input type='color' id='sole' name='sole' value={modelUpdate.sole} onChange={handleChange} />
                <label htmlFor="sole">Sole</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="product">Design</label>
            <select type='color' id='product' name='product' value={modelUpdate.product} onChange={handleChange}>
              <option value="/shoe/shoe.gltf">Shoe</option>
              <option value="/sweater/sweater.gltf">Sweater</option>
              <option value="/jacket/jacket.gltf">Jacket</option>
            </select>
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input type='text' id='name' name='name' value={modelUpdate.name} required onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea type='text' id='description' name='description' value={modelUpdate.description} onChange={handleChange} />
          </div>
          <button className="create-model-btn" type="submit">Update Design</button>
        </div>
      </form>
    </>
  );
}

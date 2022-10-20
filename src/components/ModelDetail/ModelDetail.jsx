import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import * as portfolioAPI from '../../utilities/portfolio-api';
import Lights from '../../components/Lights/Lights';
import Hoodie from '../../components/Hoodie/Hoodie';
import Skirt from '../../components/Skirt/Skirt';
import Kicks from '../../components/Kicks/Kicks';
import WomenShirt from '../../components/WomenShirt/WomenShirt';
import WomenPants from '../../components/WomenPants/WomenPants';
import Shirt from '../../components/Shirt/Shirt';
import Shoe from '../../components/Shoe/Shoe';


export default function ModelDetail({ models, user, setModels }) {
  let { id } = useParams();
  const [model, setModel] = useState([]);
  useEffect(
    function () {
      async function getModel(id) {
        const object = await models.filter((model) => model._id === id);
        await portfolioAPI.getOne(id);
        setModel(...object);
      }
      getModel(id);
    },
    [models, id, user]
  );

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      let removed = await portfolioAPI.deleteModel(id);
      if (removed === 'removed') {
        const currentModels = await portfolioAPI.getAll();
        setModels([...currentModels]);
        navigate('/portfolio');
      }
    } catch (e) {
      let err = new Error(e);
      console.log(err);
    }
  };
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  return (
    <>
      <main className='new-model'>
        <div className='detail-wrapper'>
          <div className='new-card'>
            <div className='product-canvas'>
              <Canvas shadows camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <Suspense fallback={<Loader />}>
                  {model.product === '/shoe/shoe.gltf' ? (
                    <Shoe castShadow mesh={model.mesh} />
                  ) : model.product === '/hoodie/hoodie.gltf' ? (
                    <Hoodie
                      mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                  ) : model.product === '/skirt/skirt.gltf' ? (
                    <Skirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                  ) : model.product === '/kicks/kicks.gltf' ? (
                    <Kicks mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                  ) : model.product === '/women-shirt/women-shirt.gltf' ? (
                    <WomenShirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                  ) : model.product === '/shirt/shirt.gltf' ? (
                    <Shirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                  ) : model.product === '/women-pants/women-pants.gltf' ? (
                    <WomenPants scale={4.5} mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                  ) : (
                    <Shoe />
                  )}
                  <Lights />
                  <OrbitControls />
                </Suspense>
              </Canvas>
            </div>
          </div>
          <div className='info-card'>
            <div className='capitalize'>
              <label className='name-labels' htmlFor='name'>
                Name
              </label>
              {model.name}
            </div>
            <div className='capitalize'>
              <label className='name-labels' htmlFor='name'>
                Description
              </label>
              {model.description}
            </div>
          </div>
        </div>
      </main>
      <button className='update-btn' onClick={() => handleDelete(id)}>
        Delete Design
      </button>
    </>
  );
}

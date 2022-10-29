import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import * as portfolioAPI from '../../utilities/portfolio-api';
import Lights from '../../components/Lights/Lights';
import { HoodieInstances, Hoodie } from '../../components/Hoodie/Hoodie';
import { SkirtInstances, Skirt } from '../../components/Skirt/Skirt';
import { KicksInstances, Kicks } from '../../components/Kicks/Kicks';
import { WomenShirtInstances, WomenShirt } from '../../components/WomenShirt/WomenShirt';
import { WomenPantsInstances, WomenPants } from '../../components/WomenPants/WomenPants';
import { ShirtInstances, Shirt } from '../../components/Shirt/Shirt';


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
      <main className='detail-model'>
        <div className='detail-wrapper'>
          <div className='new-card'>
            <div className='product-canvas'>
              <Canvas shadows camaera={{ position: [-5, 2, 10], fov: 70 }}>
                <Suspense fallback={<Loader />}>
                  {model.product === '/hoodie/hoodie.gltf' ? (
                    <HoodieInstances>
                      <Hoodie mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </HoodieInstances>
                  ) : model.product === '/skirt/skirt.gltf' ? (
                    <SkirtInstances>
                      <Skirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </SkirtInstances>
                  ) : model.product === '/kicks/kicks.gltf' ? (
                    <KicksInstances>
                      <Kicks mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </KicksInstances>
                  ) : model.product === '/women-shirt/women-shirt.gltf' ? (
                    <WomenShirtInstances>
                      <WomenShirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </WomenShirtInstances>
                  ) : model.product === '/shirt/shirt.gltf' ? (
                    <ShirtInstances>
                      <Shirt mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </ShirtInstances>
                  ) : model.product === '/women-pants/women-pants.gltf' ? (
                    <WomenPantsInstances>
                      <WomenPants scale={4.5} mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </WomenPantsInstances>
                  ) : (
                    <HoodieInstances>
                      <Hoodie mesh={model.mesh} stripes={model.stripes} sole={model.sole} />
                    </HoodieInstances>
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
      <button className='update-btn' >
        <Link to='/portfolio/' style={{ color: "white", textDecoration: "none" }} >Portfolio</Link>
      </button>
    </>
  );
}

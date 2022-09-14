import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Jacket } from '../../components/Jacket/Jacket';
import { Shoe, ShoeInstances } from '../../components/Shoe/Shoe';
import Sweater from '../../components/Sweater/Sweater';
import Lights from '../../components/Lights/Lights';

export default function PortfolioListPage({ model }) {
  return (
    <>
      <div className='new-model'>
        <div className='wrapper'>
          <div className='card'>
            <div className='product-canvas'>
              <Canvas
                shadows
                linear
                camaera={{ position: [-5, 2, 10], fov: 70 }}
              >
                {model.product === '/shoe/shoe.gltf' ? (
                  <ShoeInstances>
                    <Shoe castShadow position={[0.001, 0, 8]} />
                    <meshStandardMaterial color={model.mesh} transparent />
                  </ShoeInstances>
                ) : model.product === '/jacket/jacket.gltf' ? (
                  <Jacket textures={model} />
                ) : model.product === '/sweater/sweater.gltf' ? (
                  <Sweater textures={model} />
                ) : (
                  <Shoe textures={model} />
                )}
                <Lights />
                <OrbitControls />
              </Canvas>
            </div>
          </div>
          <div className='info-card'>
            <div>
              <label className='name-labels' htmlFor='product'>
                Design
              </label>
              <h3 className='capitalize'>{model.product.split('/')[1]}</h3>
            </div>
            <div>
              <label className='name-labels' htmlFor='name'>
                Name
              </label>
              <h3 className='capitalize'>{model.name}</h3>
            </div>
            <div className='description'>
              <label className='name-labels' htmlFor='description'>
                Description
              </label>
              <h3 className='desc'>{model.description}</h3>
            </div>
          </div>
          <div>
            <Link className='edit-link' to={`/portfolio/${model._id}`}>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

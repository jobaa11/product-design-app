import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useProgress, Html } from '@react-three/drei';
import Lights from '../../components/Lights/Lights';
import PortfolioListCard from '../../components/PortfolioListCard/PortfolioListCard';

export default function Portfolio({ models }) {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
  return (
    <>
      {models.length > 0 ? (
        <Canvas
          shadows
          linear
          camaera={{ position: [-2, 2, 10], fov: 70 }}
        >
          <Suspense fallback={<Loader />}>
            <Lights />
            <OrbitControls />
            {models.map((model, idx) => (
              <>
                <PortfolioListCard name={model.name} model={model} key={model._id} attach={`material-${idx}`} />
              </>
            ))}
          </Suspense>
        </Canvas>
      ) : (
        <button className='add-btn'>
          <Link style={{ color: 'white', textDecoration: 'none' }} to='/models/new'>
            Add a Model
          </Link>
        </button>
      )}
    </>
  );
}

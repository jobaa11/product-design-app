import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useProgress, Html } from '@react-three/drei';
import Lights from '../../components/Lights/Lights';
import PortfolioListCard from '../../components/PortfolioListCard/PortfolioListCard';

export default function Portfolio({ models }) {
  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }

  function Foo() {
    const { camera } = useThree();
    camera.position.x = 4;
    camera.position.z = 7;
  }

  return (
    <>
      {models.length > 0 ? (
        <Canvas
          shadows
          linear
        >
          <Foo />
          <Suspense fallback={<Loader />}>
            <Lights />
            <OrbitControls enableDamping rotateSpeed={0.5} autoRotate autoRotateSpeed={0.8} />
            {models.map((model, idx) => (
              <>
                <PortfolioListCard name={model.name} model={model} key={model._id} t={idx / models.length * 2 * Math.PI} attach={`material-${idx}`} />
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

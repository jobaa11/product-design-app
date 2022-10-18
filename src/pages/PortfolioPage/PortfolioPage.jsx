import PortfolioListCard from '../../components/PortfolioListCard/PortfolioListCard';
import { Link } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from '../../components/Lights/Lights';
// import { Flex, Box } from '@react-three/flex'


function Foo() {
  const state = useThree()
console.log(state)
}

export default function Portfolio({ models }) {


  return (
    <>
      <Canvas
        shadows
        linear
        camaera={{ position: [-2, 2, 10], fov: 70 }}
      >
        <Lights />
        <OrbitControls />
        <Foo/>
        {models.length > 0 ? (
          models.map((model, idx) => (
            <>
              <PortfolioListCard name={model.name} model={model} key={model._id} attach={`material-${idx}`} />
            </>
          ))
        ) : (
          <>
            <button className='add-btn'>
              <Link style={{ color: 'white' }} to='/models/new'>
                Add a Model
              </Link>
            </button>
          </>
        )}
      </Canvas>
    </>
  );
}

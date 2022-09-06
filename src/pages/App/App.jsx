import { Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, softShadows } from '@react-three/drei';
import NavBar from '../../components/NavBar/NavBar';
// import { Section } from '../Sections/Sections';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
// import { softShadows } from '@react-three/drei';

softShadows();


const Box = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh castShadow ref={mesh}>
      <boxBufferGeometry attach='geometry' arg={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='lightpink' transparent/>
    </mesh>
  )
}

export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <div id="root" className='App'>
      <NavBar user={user} setUser={setUser} />
      {user ?
        <>
          <Routes>
            {/* Route components in here */}
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
      <Canvas shadows className='canvas' colorManagement camaera={{ position: [-5, 2, 10], fov: 70 }}>
        <OrbitControls />
        {/* <Stars /> */}
        <ambientLight intensity={0.9} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={.3}/>
          </mesh>
        </group>
        <Box />
      </Canvas >
    </div>
  );
}

          // <main className="App">
            // {user ?
            //   <>
            //     <Routes>
            //       {/* Route components in here */}
            //       <Route path='/orders/new' element={<NewOrderPage />} />
            //       <Route path='/orders' element={<OrderHistoryPage />} />
            //     </Routes>
            //   </>
            //   :
            //   <AuthPage setUser={setUser} />
            // }
          // </main>
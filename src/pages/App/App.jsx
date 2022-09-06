import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Plane } from '@react-three/drei';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import { Html } from '@react-three/drei';
// import { Section } from '../Sections/Sections';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';


function Box() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="lightblue" />
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
      <Canvas className='canvas'>
        <OrbitControls />
        {/* <Stars /> */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Box />
        {/* <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} /> */}
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
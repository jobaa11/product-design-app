import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import Scene from '../Scene/Scene';
import { OrbitControls, softShadows } from '@react-three/drei';
import state from '../../components/state';
import Model from '../../components/Model/Model';
import Lights from '../../components/Lights/Lights';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import NewModelPage from '../NewModelPage/NewModelPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

softShadows();


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div id="root" className='App'>
      <NavBar user={user} setUser={setUser} />
      {user ?
        <>
          <Routes>
            <Route path='/models/new' element={<NewModelPage user={user} setUser={setUser}/>} />
            <Route path='/models/portfolio' element={<OrderHistoryPage user={user} setUser={setUser}/>} />
            <Route path='/' element={<Navigate to='/models/portfolio' />} />
            
          </Routes>
          <Scene />
        </>
        :
        <AuthPage setUser={setUser} />
      }
      <Canvas shadows
        className='canvas'
        colorManagement
        camaera={{ position: [-5, 2, 10], fov: 70 }}>
        <Suspense fallback={null}>
          <Model />
          <Lights />
          <OrbitControls />
        </Suspense>
      </Canvas >
      <div className='scrollArea'>
        <div style={{ position: 'sticky', top: 0 }}></div>
        <div style={{ position: `${state.pages * 100}vh` }} ></div>
      </div>
    </div>
  );
}

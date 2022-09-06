import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, softShadows } from '@react-three/drei';
import  ModelView  from '../../components/Model/Model';
import Lights from '../../components/Lights/Lights';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

softShadows();


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div id="root" className='App'>
      <NavBar user={user} setUser={setUser} />
      {user ?
          <Routes>
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        :
        <AuthPage setUser={setUser} />
      }
      <Canvas shadows
        className='canvas'
        colorManagement
        camaera={{ position: [-5, 2, 10], fov: 70 }}>
        <Suspense fallback={null}>
          <ModelView />
          <Lights />
          <OrbitControls />
        </Suspense>
      </Canvas >
    </div>
  );
}

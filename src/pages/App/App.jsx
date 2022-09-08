import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import Lights from '../../components/Lights/Lights';
import Shoe from '../../components/Shoe/Shoe';
import { OrbitControls, softShadows } from '@react-three/drei';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import NewModelPage from '../NewModelPage/NewModelPage';
import Portfolio from '../PortfolioPage/PortfolioPage';
import PortfolioDetailPage from '../../pages/PortfolioDetail/PortfolioDetailPage'
import * as modelsApi from '../../utilities/models-api'

softShadows();


export default function App() {
  const [user, setUser] = useState(getUser());
  // const [models, setModels] = useState([]);

  // useEffect(function () {
  //     async function getModels() {
  //         const models = await modelsApi.getAll();
  //         setModels(models);
  //     }
  //     getModels();
  // }, []);
  return (
    <div id="root" className='App'>
      <NavBar user={user} setUser={setUser} />
      {user ?
        <>
          <Routes>
            <Route path='/models/new' element={<NewModelPage user={user} setUser={setUser} />} />
            <Route path='/portfolio' element={<Portfolio user={user} setUser={setUser} key={user.name}/>} />
            <Route path='/' element={<Navigate to='/portfolio' user={user} setUser={setUser}/>} />
            <Route path='/portfolio/:id' element={<PortfolioDetailPage user={user} setUser={setUser} />} />
          </Routes>
        </>
        :
        <>
        <AuthPage setUser={setUser} />
        <Canvas shadows
        className='canvas'
        camaera={{ position: [-5, 2, 10], fov: 70 }}>
        <Suspense fallback={null}>
          <group>
            <mesh
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -3, 0]}>
              <planeBufferGeometry attach='geometry' args={[100, 100]} />
              <shadowMaterial attach='material' opacity={.3} />
            </mesh>
          </group>
          <Shoe />
          <Lights />
          <OrbitControls />
        </Suspense>
      </Canvas >
        </>
      }


    </div>
  );
}

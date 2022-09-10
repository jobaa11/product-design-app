import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import Index from '../Index/Index';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import NewModelPage from '../NewModelPage/NewModelPage';
import Portfolio from '../PortfolioPage/PortfolioPage';
import UpdateModelPage from '../../pages/UpdateModelPage/UpdateModelPage'
import * as portfoliosAPI from '../../utilities/portfolios-api'

export default function App() {
  const [user, setUser] = useState(getUser());
  const [models, setModels] = useState([]);

  useEffect(function () {
    async function getModels() {
      const models = await portfoliosAPI.getAll();
      setModels(models);
    }
    getModels();
  }, [user]);

  return (
    <div id="root" className='App'>
      <NavBar user={user} setUser={setUser} />
      {user ?
        <>
          <Routes>
            <Route path='/models/new' element={<NewModelPage user={user} setUser={setUser} models={models} setModels={setModels}/>} />
            <Route path='/portfolio' element={<Portfolio user={user} setUser={setUser} key={user._id} models={models} />} />
            {/* <Route path='/about' element={<About/>} /> */}
            <Route path='/' element={<Navigate to='/portfolio' user={user} setUser={setUser} key={user._id}/>} />
            <Route path='/portfolio/:id' element={<UpdateModelPage user={user} setUser={setUser} models={models} />} />
          </Routes>
        </>
        :
        <>
          <AuthPage setUser={setUser} />
          <Index />
        </>
      }
    </div>
  );
}


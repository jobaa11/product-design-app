import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import Index from '../Index/Index';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import NewModelPage from '../NewModelPage/NewModelPage';
import Portfolio from '../PortfolioPage/PortfolioPage';
import PortfolioDetailPage from '../../pages/PortfolioDetail/PortfolioDetailPage'



export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <div id="root" className='App'>
      <NavBar user={user} setUser={setUser} />
      { user ?
        <>
          <Routes>
            <Route path='/models/new' element={<NewModelPage user={user} setUser={setUser} />} />
            <Route path='/portfolio' element={<Portfolio user={user} setUser={setUser} key={user.name} />} />
            <Route path='/' element={<Navigate to='/portfolio' user={user} setUser={setUser} />} />
            <Route path='/portfolio/:id' element={<PortfolioDetailPage user={user} setUser={setUser} />} />
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


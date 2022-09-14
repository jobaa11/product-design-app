import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import * as portfolioAPI from '../../utilities/portfolio-api';
import NavBar from '../../components/NavBar/NavBar';
import Index from '../../components/Index/Index';
import AuthPage from '../AuthPage/AuthPage';
import NewModelPage from '../NewModelPage/NewModelPage';
import Portfolio from '../PortfolioPage/PortfolioPage';
import UpdateModelPage from '../UpdateModelPage/UpdateModelPage';
import About from '../About/About';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [models, setModels] = useState([]);

  useEffect(
    function () {
      async function getModels() {
        const model = await portfolioAPI.getAll();
        setModels(model);
      }
      getModels();
    },
    [user]
  );

  return (
    <div id='root' className='App'>
      <NavBar user={user} setUser={setUser} />
      {user ? (
        <>
          <div className='media-scroller snap-inline'>
            <Routes>
              <Route
                path='/models/new'
                element={
                  <NewModelPage
                    user={user}
                    setUser={setUser}
                    models={models}
                    setModels={setModels}
                  />
                }
              />
              <Route
                path='/portfolio'
                element={
                  <Portfolio
                    user={user}
                    setUser={setUser}
                    models={models}
                    setModels={setModels}
                  />
                }
              />
              <Route path='/about' element={<About />} />
              <Route
                path='/'
                element={
                  <Navigate
                    to='/portfolio'
                    user={user}
                    setUser={setUser}
                    key={user._id}
                  />
                }
              />
              <Route
                path='/portfolio/:id'
                element={
                  <UpdateModelPage
                    user={user}
                    setUser={setUser}
                    models={models}
                    setModels={setModels}
                  />
                }
              />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <AuthPage setUser={setUser} />
          <Index />
        </>
      )}
    </div>
  );
}

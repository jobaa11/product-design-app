import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
   
    <header>
      <div className='header-main'>
        <div className='logo'>Ọja.</div>
        <nav>
          <ul>
            {user ?
              <li>
                welcome, {user.name.trim().replace(/^\w/, (c) => c.toUpperCase())}.
                &nbsp;| &nbsp;
              </li> : ''}
              { user ?
            <li className='links'>
              <Link to='/portfolio'>portfolio</Link>
              &nbsp; | &nbsp;
            </li> : ''
            // <li className='links'>
            //   <Link to='/research'>research</Link>
            // </li> 
            }
            {user ?
            <li className='links'>
              <Link to='/about'>about us</Link>
            &nbsp; | &nbsp;
            </li> : '' }
            {user ?
            <li className='links'>
              <Link to='' onClick={handleLogOut}>log out</Link>
            &nbsp; | &nbsp;
            </li> : '' }
            <li className='btn'>
              
              <Link to='/models/new'>{user ? 'design' : 'about us'}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
   
  );
}
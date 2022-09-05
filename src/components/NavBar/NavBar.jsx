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
            welcome, ____
            {/* Welcome, {user.name} MAKE SURE TO ADD TERNARY TO SHOW NAME */}
            &nbsp; | &nbsp;
            <li className='links'>
              <Link to='/orders'>portfolio</Link>
            </li>
            &nbsp; | &nbsp;
            <li className='links'>
              <Link to='/orders/new'>about us</Link>
            </li>
            &nbsp; | &nbsp;
            <li className='links'>
              <Link to='' onClick={handleLogOut}>log out</Link>
            </li>
            &nbsp; | &nbsp;
            <li className='btn'>
              <Link to=''>design</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
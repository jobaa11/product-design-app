import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';


export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <header>
      <div className='header-main'>
        <div className='logo'>Ọja.</div>
        <Navbar fixed='top'  bg='transparent' expand='md' className='mb-1 nav'>
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
            <Navbar.Offcanvas
              id='offcanvasNavbar-expand-md'
              aria-labelledby='offcanvasNavbarLabel-expand-md'
              placement="bottom"
            >
              <Offcanvas.Header style={{ background: 'rgba(165, 207, 225, 0.0)' }} closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>
                  Ọja.
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body  bg='transparent' style={{ background: 'rgba(165, 207, 225, 0.0)' }} >
                <Nav className='me-auto ul' defaultActiveKey='/portfolio' as='ul'>
                  <Stack direction="horizontal" gap={0} minBreakpoint-md>
                    {user ? (
                      <Nav.Item className='li'>
                        welcome,{' '}
                        {user.name.trim().replace(/^\w/, (c) => c.toUpperCase())}. &nbsp;| &nbsp;

                      </Nav.Item>
                    ) : (
                      ''
                    )}
                    {user ? (
                      <Nav.Item className='links li'>
                        <Nav.Link href='/portfolio'>portfolio &nbsp; | &nbsp;</Nav.Link>

                      </Nav.Item>
                    ) : (
                      ''
                    )}
                    {user ? (
                      <Nav.Item className='links li'>
                        <Nav.Link to='' onClick={handleLogOut}>
                          log out &nbsp; | &nbsp;
                        </Nav.Link>

                      </Nav.Item>
                    ) : (
                      ''
                    )}
                    {user ? (<Nav.Item className='btn'>
                      <Nav.Link href='/models/new' >
                        design
                      </Nav.Link>
                    </Nav.Item>) : ''}
                  </Stack>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </header >
  );
}

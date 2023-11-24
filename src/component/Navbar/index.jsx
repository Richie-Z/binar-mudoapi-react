import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css'

function NavBar() {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLoginLogout = () => {
    if (accessToken) localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container fluid>
        <Link to={'/'}>
          <Navbar.Brand>Navbar</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={'/'}>
              <Nav>Home</Nav>
            </Link>
          </Nav>

          {pathname !== '/login' && (
            <Button variant={accessToken ? "outline-danger" : "outline-success"} onClick={handleLoginLogout}>{accessToken ? 'Logout' : 'Login'}</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

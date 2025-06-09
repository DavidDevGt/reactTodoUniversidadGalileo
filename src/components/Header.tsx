import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveView } from '../store/navigationSlice';
import type { RootState } from '../store/store';

export default function Header() {
  const dispatch = useDispatch();
  const activeView = useSelector((state: RootState) => state.navigation.activeView);

  const handleNavClick = (view: 'tasks' | 'goals') => {
    dispatch(setActiveView(view));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4" sticky="top">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React Logo"
            width="36"
            height="36"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#" 
              active={activeView === 'tasks'}
              onClick={() => handleNavClick('tasks')}
            >
              Tasks
            </Nav.Link>
            <Nav.Link 
              href="#" 
              active={activeView === 'goals'}
              onClick={() => handleNavClick('goals')}
            >
              Goals
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

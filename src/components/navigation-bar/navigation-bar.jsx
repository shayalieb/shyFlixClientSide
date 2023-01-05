import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';


export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>shyFlix Movie App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                                <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to='/movies'>Home</Nav.Link>
                                <Nav.Link as={Link} to='/users/:Username'>Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>

                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
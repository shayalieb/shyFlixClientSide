import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';


export const NavigationBar = ({ user, onLoggedOut, onLoggedIn }) => {
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
                                <Nav.Link href='/movies'>Home</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                                <Nav.Link href='/users/:Username'>Profile</Nav.Link>
                                <Nav.Link href='/movies'>Movies</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
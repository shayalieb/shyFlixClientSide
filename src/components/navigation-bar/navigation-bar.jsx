import { Navbar, Container, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './shyflix-logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken } from '../../redux/reducers/user'
import Logo from './shyflix-logo.png'
import './navigation-bar.scss'

export const NavigationBar = () => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    return (
        <Navbar className='navbar' bg='dark' variant='dark' expand='lg' fixed='top'>
            <Container>
                <Navbar.Brand className='navbar-title'>
                    <img className='log' src={Logo} />
                </Navbar.Brand>
                <Nav className='me-auto'>
                    {!user && (
                        <>
                            <Nav.Link className='nav-link' as={Link} to='/login'>Login</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to='/Signup'>Signup</Nav.Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Nav.Link className='nav-link' as={Link} to='/'>Movies</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to='/Profile'>Profile</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} onClick={() =>
                                dispatch(setUser(null),
                                    dispatch(setToken(null)),
                                    localStorage.clear())}>
                                Logout
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>

    );
};

const mapStateToProps = {
    user: PropTypes.string.isRequired
};

// export default connect(mapStateToProps, { LOGIN, LOGOUT, UPDATE_USER })(NavigationBar)
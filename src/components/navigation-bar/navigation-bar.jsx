import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './shyflix-logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user'
import './navigation-bar.scss'

export const NavigationBar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();

    return (
        <Navbar className='navbar' bg='dark' variant='dark' expand='md' fixed='top'>
            <Container>
                <Navbar.Brand className='navbar-title'>
                    <img className='log' src={Logo} />
                </Navbar.Brand>
                <Nav>
                    {!user ? (
                        <>
                            <Link className='nav-link' to={`/login`}>Login</Link>
                            <Link className='nav-link' to={`/signup`}>Signup</Link>
                        </>
                    ) : (
                        <Link className='nav-link' to={`/`} >Movies
                        </Link>

                    )}
                    {user ? (
                        <>
                            <Link className='nav-link' to={`/profile`}>
                                {user.Username}
                            </Link>
                            <Button className='primary text-light'
                                onClick={() => dispatch(setUser(null))}
                            >Logout</Button>
                        </>
                    ) : null}
                </Nav>
            </Container>
        </Navbar>

    );
};

// NavigationBar.propTypes = {
//     Username: PropTypes.shape({
//         Username: PropTypes.string.isRequired,
//     }),
//     onLoggedOut: PropTypes.func.isRequired,
// };
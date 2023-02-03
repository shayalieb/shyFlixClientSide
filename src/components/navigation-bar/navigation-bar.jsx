import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './shyflix-logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateUser } from '../../redux/reducers/user'
import { connect } from 'react-redux';
import { LOGIN, LOGOUT, UPDATE_USER } from '../../actions/actions';
import './navigation-bar.scss'

export const NavigationBar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch(login, logout);

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
                                onClick={() => dispatch(logout)}
                            >Logout</Button>
                        </>
                    ) : null}
                </Nav>
            </Container>
        </Navbar>

    );
};

const mapStateToProps = {
    user: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { LOGIN, LOGOUT, UPDATE_USER })(NavigationBar)
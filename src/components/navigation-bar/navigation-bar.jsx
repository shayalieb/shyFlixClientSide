import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react-router-dom'
import { MovieCard } from '../movie-card/movie-card';
// import { ProfileView } from '../profile-view/profile-view';
// import { MovieCard } from '../movie-card/movie-card';
// import { LoginView } from '../login-view/login-view';
// import { SignupView } from '../signup-view/signup-view';
// import { MovieView } from '../movie-view/movie-view';

export function NavigationBar({ user, onLoggedOut }) {

    return (
        <Navbar className='navbar' bg='dark' variant='dark' expand='md' fixed='top'>
            <Container>
                <Navbar.Brand className='navbar-title'>
                    shyFlix Movie App
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
                                onClick={() => {
                                    onLoggedOut();
                                }}
                            >Logout</Button>
                        </>
                    ) : null}
                </Nav>
            </Container>
        </Navbar>

    );
};

NavigationBar.propTypes = {
    Username: PropTypes.shape({
        Username: PropTypes.string.isRequired,
    }),
    onLoggedOut: PropTypes.func.isRequired,
};
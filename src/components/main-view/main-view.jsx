//Import dependencies
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
//Import components
import { SignupView } from '../signup-view/signup-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null)
    const [movies, setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState(null)

    useEffect(() => {
        if (!token) return;
        fetch('https://shyflixapp.herokuapp.com/movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
        localStorage.setItem('user')
        localStorage.setItem('token')
            .then((movies) => {
                setMovies(movies);
            });
        console.error(error);
    }, [token]);

    if (!user) {
        return (
            <>
                <h1>Welcome to the ShyFlix Movie App</h1>
                <p>The shyFlix Movie App was designed to help keep track of all of your favorite movies. This way you can keep track of what you watched and what is on your watch list.</p>
                <br />
                <h5>If you are already a member, please log in to continue.</h5>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
                <br />
                <br />
                <h5>If you are not a member, please sign up here</h5>
                <SignupView />
            </>
        );
    }

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }} />
            <Row className='justify-content-center'>
                <Routes>
                    <Route
                        path='/signup'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col ms={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/login'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/movies'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : movies.length === 0 ? (
                                    <Col>The movie list is empty</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/users/:Username'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView users={users} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>

            </Row>
        </BrowserRouter>
    );
};
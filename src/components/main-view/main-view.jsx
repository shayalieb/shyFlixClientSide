//Import dependencies
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//Import components
import { SignupView } from '../signup-view/signup-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token')

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token')
        fetch('https://shyflixapp.herokuapp.com/movies')
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = token.data.map((movies) => {
                    return {
                        Title: movies.Title,
                        imagepath: `/movies/${imagepath}`,
                        Genre: movies.Genre.Name,
                        Director: movies.Director.Name,
                    };
                });
                if (localStorageToken) {
                    setMovies(moviesFromApi);
                }
            });
    }, []);

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
                                    <Col md={5}>
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
                                    <Navigate to='/' />
                                ) : movies.length === 0 ? (
                                    <Col>This list is empty</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView onLoggedIn={(movies) => setMovies(movies)} />
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
                                    <Navigate to='/' />
                                ) : movies.length === 0 ? (
                                    <Col>The movie list is empty</Col>
                                ) : (
                                    <>
                                        {movies.map((movies) => (
                                            <Col className='mb-4' key={movies._id} md={3}>
                                                <MovieCard movies={(movies) => setMovies(movies)} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/users/:Username'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <ProfileView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>

        </BrowserRouter>

    )
}
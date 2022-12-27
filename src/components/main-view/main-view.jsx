import { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('https://shyflixapp.herokuapp.com/users/:Username')
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.doc.map((doc) => {
                    return {
                        _id: data.doc.key,
                        Title: data.Movies.Title,
                        imagepath: `https://shyflixapp.herokuapp.com/movies/:_id/${movies.imagepath}`,
                        Director: data.doc.Director.Name,
                        Genre: data.doc.Genre.Name
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }} />

            <Row className='justify-content-md-center'>
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
                        path='/profile'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/users' />
                                ) : (
                                    <Col md={5}>
                                        <ProfileView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/movies/:_id'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/movies' replace />
                                ) : movies.length === 0 ? (
                                    <Col>This list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path='/'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/movies' replace />
                                ) : movies.length === 0 ? (
                                    <Col>The movie list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => {
                                            <Col className='mb=4' key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        })}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
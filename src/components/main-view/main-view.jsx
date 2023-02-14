//App dependencies
import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Routes, Route, Navigate, BrowserRouter, useParams } from 'react-router-dom';
//Import the different view
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieList } from '../movie-list/movie-list';
//Redux dependencies
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setUser, setToken } from '../../redux/reducers/user';
import './main-view.scss'

export const MainView = () => {
    //useDispatch to hook into store
    const dispatch = useDispatch();
    //Get the state of the user and token variables
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const movies = useSelector((state) => state.movies.list);

    //If the token is in local storage, use it to pull all movies request
    useEffect(() => {
        if (!token) {
            return
        }
        fetch('https://shyflixapp.herokuapp.com/movies', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((movies) => {
                localStorage.setItem('movies', JSON.stringify(movies))
                dispatch(setMovies(movies))
            })
    }, [token])

    return (
        <BrowserRouter>
            <NavigationBar />

            <Row className='justify-content-md-center'>
                <Routes>

                    {/* The route for signing up */}
                    <Route path='/signup'
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

                    {/* The route for login in */}
                    <Route path='/login'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <LoginView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* The rout for ProfileView - view/edit profile */}
                    <Route path='/profile'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' />
                                ) : (
                                    <Col md={10}>
                                        <ProfileView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* The rout to MovieView - open a single movie*/}
                    <Route path='/movies/:movieId'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} token={token} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* The rout to get the list of all movies */}
                    <Route path='/'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <MovieList className='movie-list-home' />
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};

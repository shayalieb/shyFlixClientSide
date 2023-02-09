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
    const { movieId } = useParams();

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
                                        <ProfileView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* The rout to MovieView - open a single movie*/}
                    <Route path='/movies/movieId'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
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
                                ) :
                                    <MovieList className='movie-list-home' />
                                }
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
// //App dependencies
// import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// //Import the various views
// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import { SignupView } from "../signup-view/signup-view";
// import { ProfileView } from "../profile-view/profile-view";
// import { NavigationBar } from "../navigation-bar/navigation-bar";
// //Redux dependencies
// import { useSelector, useDispatch } from "react-redux";
// import { setMovies } from "../../redux/reducers/movies";
// import { setUser } from "../../redux/reducers/user";
// import { MovieList } from "../movie-list/movie-list";
// import { connect } from "react-redux";






// export const MainView = () => {

//     const movies = useSelector((state) => state.movies.list);
//     const user = useSelector((state) => state.setUser)
//     const token = useSelector((state) => state.token)
//     // const [movies, setMovies] = useState(
//     //     localStorage.getItem('movies')
//     //         ? JSON.parse(localStorage.getItem('movies'))
//     //         : []
//     // );
//     // const [user, setUser] = useState(
//     //     localStorage.getItem('user')
//     //         ? JSON.parse(localStorage.getItem('user'))
//     //         : null
//     // );
//     // const [token, setToken] = useState(
//     //     localStorage.getItem('token')
//     // );


//     useEffect(() => {
//         if (!token) return;

//         fetch("https://shyflixapp.herokuapp.com/movies", {

//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },


//         })
//             .then((response) => response.json())
//             .then((movies) => {
//                 localStorage.setItem("movies", JSON.stringify(movies));
//                 //dispatch(login(user))
//                 dispatch(setUser(movies));
//                 dispatch(setUser(token));
//             });
//     }, [token]);

//     return (
//         <BrowserRouter>
//             <NavigationBar
//             // user={user}
//             // onLoggedOut={() => {
//             //     setUser(null);
//             //     setToken(null)
//             //     localStorage.clear();
//             //}}
//             />
//             <Row className="justify-content-md-center">
//                 <Routes>
//                     <Route
//                         path="/signup"
//                         element={
//                             <>
//                                 {user ? (
//                                     <Navigate to="/" />
//                                 ) : (
//                                     <Col md={5}>
//                                         <SignupView />
//                                     </Col>
//                                 )}
//                             </>

//                         }
//                     />
//                     <Route
//                         path="/login"
//                         element={
//                             <>
//                                 {user ? (
//                                     <Navigate to="/" />
//                                 ) : (
//                                     <Col md={5}>
//                                         <LoginView
//                                         // onLoggedIn={(user, token, data) => {
//                                         //     setUser(user);
//                                         //     setToken(token);
//                                         //     localStorage.setItem('user', JSON.stringify(user));
//                                         //     localStorage.setItem('token', token),
//                                         //         history.back();
//                                         // }}
//                                         />
//                                     </Col>
//                                 )}
//                             </>

//                         }
//                     />
//                     <Route
//                         path="/movies/:movieId"
//                         element={
//                             <>
//                                 {!user ? (
//                                     <Navigate to="/login" replace />
//                                 ) : movies.length === 0 ? (
//                                     <Col>The list is empty!</Col>
//                                 ) : (
//                                     <Col md={8}>
//                                         <MovieView />
//                                     </Col>
//                                 )}
//                             </>
//                         }
//                     />
//                     <Route
//                         path="/"
//                         element={
//                             <>
//                                 {!user ? (
//                                     <Navigate to="/login" replace />
//                                 ) : movies.length === 0 ? (
//                                     <Col>The list is empty!</Col>
//                                 ) : (
//                                     <>
//                                         {movies.map((movie) => (
//                                             <Col className="mb-5" key={movie._id} sm={5} md={3}>
//                                                 <br />
//                                                 <br />
//                                                 <MovieList />
//                                                 {/* <MovieCard
//                                                     movie={movie}
//                                                     user={user}
//                                                     token={token}
//                                                     setUser={setUser}
//                                                 /> */}
//                                             </Col>
//                                         ))}
//                                     </>
//                                 )}
//                             </>
//                         }
//                     />
//                     <Route
//                         path="/profile"
//                         element={
//                             <>
//                                 {!user ? (
//                                     <Navigate to="/login" replace />
//                                 ) : user.length === 0 ? (
//                                     <Col>No such user found!</Col>
//                                 ) : (
//                                     <Col>
//                                         <ProfileView
//                                             movies={movies} />
//                                     </Col>
//                                 )}
//                             </>
//                         }
//                     />
//                 </Routes>
//             </Row>
//         </BrowserRouter>
//     );
// };

// let mapStateToProps = state => {
//     return {
//         movies: state.movies,
//         user: state.user,
//         favoriteMovies: state.favoriteMovies,
//     }
// };

// export default connect(mapStateToProps,
//     {
//         login, setUser, logout, signup,
//         updateUser, deleteUser,
//         getMovie, getMovies,
//         addFav, removeFav,
//         setFilter
//     })(MainView);
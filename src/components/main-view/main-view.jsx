//App dependencies
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
//Import the various views
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
//Redux dependencies
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";
import { MovieList } from "../movie-list/movie-list";
import { setToken } from "../../redux/reducers/token"




export const MainView = () => {

    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.setUser)
    const token = useSelector((state) => state.token)
    // const [movies, setMovies] = useState(
    //     localStorage.getItem('movies')
    //         ? JSON.parse(localStorage.getItem('movies'))
    //         : []
    // );
    // const [user, setUser] = useState(
    //     localStorage.getItem('user')
    //         ? JSON.parse(localStorage.getItem('user'))
    //         : null
    // );
    // const [token, setToken] = useState(
    //     localStorage.getItem('token')
    // );


    useEffect(() => {
        if (!token) return;

        fetch("https://shyflixapp.herokuapp.com/movies", {

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },


        })
            .then((response) => response.json())
            .then((movies) => {
                localStorage.setItem("movies", JSON.stringify(movies));
                //dispatch(setUser(user))
                dispatch(setMovies(movies));
                // dispatch(setToken(token));
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
            // user={user}
            // onLoggedOut={() => {
            //     setUser(null);
            //     setToken(null)
            //     localStorage.clear();
            //}}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                        // onLoggedIn={(user, token, data) => {
                                        //     setUser(user);
                                        //     setToken(token);
                                        //     localStorage.setItem('user', JSON.stringify(user));
                                        //     localStorage.setItem('token', token),
                                        //         history.back();
                                        // }} 
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie._id} sm={5} md={3}>
                                                <br />
                                                <br />
                                                <MovieList />
                                                {/* <MovieCard
                                                    movie={movie}
                                                    user={user}
                                                    token={token}
                                                    setUser={setUser}
                                                /> */}
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : user.length === 0 ? (
                                    <Col>No such user found!</Col>
                                ) : (
                                    <Col>
                                        <ProfileView
                                            movies={movies} />
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

export default MainView;
import React from 'react';
import { useParams } from 'react-router';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import './movie-view.scss';
import { MovieList } from '../movie-list/movie-list';
import PropTypes from 'prop-types'



export const MovieView = ({ token }) => {
    const user = useSelector((state) => state.user.user);
    const movies = useSelector((state) => state.movies.list);
    const dispatch = useDispatch();
    //const storedUser = JSON.parse(localStorage.getItem('user'));
    //const storedToken = localStorage.getItem('token');
    //const [token, setToken] = useState(storedToken ? storedToken : null);
    //const movies = useSelector((state) => state.movies.list);
    //const user = useSelector((state) => state.user)
    // const [user, setUser] = useState(storedUser ? storedUser : null)
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId)
    const similarMovies = movies.filter(
        (m) => m._id !== movie._id && m.Genre.Name === movie.Genre.Name
    );

    console.log(similarMovies, 'similar movies')
    const [isFavorite, setIsFavorite] = useState([]);





    const handleFavorite = (event) => {
        event.preventDefault();


        fetch(
            `https://shyflixapp.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((user) => {
                alert('The movie was added to your favorite movies')
                JSON.stringify(localStorage.getItem('movies'))
                localStorage.setItem("user", JSON.stringify(user));
                setIsFavorite(isFavorite);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const removeFavorite = (event) => {
        event.preventDefault();

        fetch(
            `https://shyflixapp.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((user) => {
                alert('The movie was removed from favorite movies')
                localStorage.setItem('user', JSON.stringify(user))
                dispatch(setUser(setIsFavorite));
                window.location.reload()
            })
            .catch((err) => {
                alert("Process failed");
            });
    }

    return movie && (

        <Container className='movie-container'>
            <Card className='movie-view-card'>
                <Row>
                    <Col md={6} className='movie-image'>
                        <img className='movie-image' src={movie.imagepath} />
                    </Col>
                    <Col className='movie-info' md={6}>
                        <h1>{movie.Title}</h1>
                        <hr />

                        <h3>Description: </h3>
                        <p className='movie-description'>{movie.Description}</p>
                        <hr />

                        <h3>Genre: </h3>
                        <h6>{movie.Genre.Name}</h6>
                        <hr />

                        <h3>Director: </h3>
                        <h6>{movie.Director.Name}</h6>
                    </Col>
                </Row>
                <div className='button-row'>
                    <Button
                        onClick={handleFavorite}
                        className='movie-view-button'
                        variant='success'
                        type='submit'
                    >
                        Add Favorite Movie
                    </Button>

                    <Button
                        onClick={removeFavorite}
                        className='movie-view-button'
                        variant='danger'
                        type='submit'
                    >
                        Remove Favorite Movie
                    </Button>


                    <Link to={`/`}>
                        <Button className='movie-view-button' variant='primary' type='submit'>Back</Button>
                    </Link>
                </div>

                <Row className='mt-5'>
                    <Col>
                        <h2>Similar Movies</h2>
                        <hr />
                    </Col>
                </Row>


                {similarMovies.map((sm) => (
                    <Row
                        md={3}
                        className='similar-display'
                        key={sm._id}
                    >
                        <MovieCard movie={sm} />
                    </Row>
                ))}
            </Card>
        </Container >
    );
};


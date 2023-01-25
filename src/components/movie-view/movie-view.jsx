import { useParams } from 'react-router';
import React from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './movie-view.scss';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ movies }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [token, setToken] = useState(storedToken ? storedToken : null)
    const [user, setUser] = useState(storedUser ? storedUser : null)

    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId)
    const similarMovies = movies.filter((m) => m._id && m.Genre.Name === movie.Genre.Name);
    const [isFavorite, setIsFavorite] = useState([]);




    const handleFavorite = (event) => {
        event.preventDefault();


        fetch(
            `http://localhost:8080/users/${user.Username}/movies/${movie._id}`,
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
                setUser(isFavorite);
            })
            .catch((err) => {
                alert("Process failed");
            });
    };

    const removeFavorite = (event) => {
        event.preventDefault();

        fetch(
            `http://localhost:8080/users/${user.Username}/movies/${movie._id}`,
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
                setUser(setIsFavorite);
                window.location.reload()
            })
            .catch((err) => {
                alert("Process failed");
            });
    }

    return (
        <Container>
            <br />
            <br />
            <br />
            <Row>
                <Col md={6}>
                    <img className='w-100' src={movie.imagepath} />
                </Col>
                <Col md={6}>
                    <h1>{movie.title}</h1>
                    <hr />
                    <h3>Description: </h3>
                    <p>{movie.Description}</p>
                    <br />
                    <h3>Genre: </h3>
                    <h6>{movie.Genre.Name}</h6>
                    <br />
                    <h3>Director: </h3>
                    <h6>{movie.Director.Name}</h6>
                </Col>
                <Col>
                    <Link to={`/`} className='w-100 mt-5 text-light btn btn-primary'>
                        <Button className='back-button' variant='primary'>Back</Button>
                    </Link>
                </Col>
            </Row>
            <Button
                onClick={handleFavorite}
                className='w-100 mt-2 mb-5 text-light btn btn-primary'
                variant='success'
                type='submit'
            >
                Add Favorite Movie
            </Button>
            <Button
                onClick={removeFavorite}
                className='w-100 mt-2 mb-5 text-light btn btn-primary'
                variant='danger'
                type='submit'
            >
                Remove Favorite Movie
            </Button>
            <Row className='mt-5'>
                <Col>
                    <h2>Similar Movies</h2>
                    <hr />
                </Col>
            </Row>
            {similarMovies.map((sm) => (
                <Row
                    md={3}
                    className='mb-4'
                    key={sm._id}
                >
                    <MovieCard movie={movie} />
                </Row>
            ))}
        </Container >
    );
}; 
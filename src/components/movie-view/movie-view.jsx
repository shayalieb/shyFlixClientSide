import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import PropTypes, { arrayOf } from 'prop-types';
import './movie-view.scss'
import { useState } from 'react';
import { array } from 'prop-types';

export const MovieView = ({ movies }) => {
    let { movieId } = useParams();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token')
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null)

    let movie = function findArrayById(movies, movies) {
        return movies.find((movies) => {
            return movies && movies((m) => m._id === movieId)
        })
    }

    const similarMovies = movies && movies(
        (m) => m._id !== movies._id && m.Genre.Name === movie.Genre.Name
    );

    const handleFavorites = (movie) => {
        fetch(`http://localhost:8080/users/${storedUser.Username}/movies/${movie._id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            alert('Movie was added to favorite movies')
            return response.json();
        }).then(data => updateUser(data))
            .catch((err) => {
                console.error(err);
                alert('Something went wrong')
            });
    };

    const removeFavorite = (movie) => {
        fetch(`https://shyflixapp.herokuapp.com/users/${storedUser.Username}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                alert('The movie has been removed from favorite movies');
                const newUser = {
                    ...user,
                    FavoriteMovies: user.FavoriteMovies.filter(movieData._id != movie._id)
                }
                updateUser(newUser);
            } else {
                alert('Something went wrong');
            }
        });
    };

    const updateUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(updateUser);
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
                <Col ms={5}>
                    <h2>{movie.Title}</h2>
                    <br />
                    <h2>Description</h2>
                    <p>{movie.Description}</p>
                    <br />
                    <h3>Genre</h3>
                    <p>{movie.Genre}</p>
                    <br />
                    <h3>Director</h3>
                    <p>{movie.Director}</p>
                </Col>
                <Col md={5}>
                    <Link to='/' className='"w-100 mt-5 text-light btn btn-primary"'>
                        <Button variant='primary'>Back</Button>
                    </Link>
                </Col>
                <Col>
                    <Button
                        className='add-favorite-btn'
                        variant='primary'
                        onClick={() => handleFavorites(movie._id, 'add')}
                    > Add to Favorite Movies </Button>
                </Col>
                <Col>
                    <Button
                        className='rm-favorite-btn'
                        variant='danger'
                        onClick={() => removeFavorite(movie._id, 'add')}
                    > Remove from Favorite Movies</Button>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <h3>Similar Movies</h3>
                    <hr />
                </Col>
            </Row>
            <Row>
                {similarMovies && similarMovies((sm) => (
                    <Col md={3}
                        className='mb-4'
                        key={sm._id}
                    >
                        <MovieCard
                            user={user}
                            token={token}
                            setUser={setUser}
                            movies={sm}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

MovieView.propTypes = {
    // user: PropTypes.shape({
    //     Username: PropTypes.string.isRequired,
    //     Email: PropTypes.string.isRequired,
    //     Birthday: PropTypes.string.isRequired,
    //     FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // }).isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
    movie: PropTypes.arrayOf(
        PropTypes.shape({
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            imagepath: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Description: PropTypes.string.isRequired,
            }).isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Bio: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    ).isRequired
};
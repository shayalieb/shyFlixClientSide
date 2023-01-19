import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const MovieCard = ({ user, token, movie, setUser }) => {
    const isFavorite = (movieId) => {
        return user.FavoriteMovies.includes(movieId);
    };

    const toggleFavorites = (event) => {
        event.preventDefault();

        fetch(`https://shyflixapp.herokuapp.com//users/${user}/movies/${movie._id}`,
            {
                method: isFavorite(movie._id) ? 'POST' : 'DELETE',
                headers: {
                    Authorization: `Bearer: ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((updateUser) => {
                localStorage.setItem('user', JSON.stringify(updateUser));
                setUser(updateUser)
            })
            .catch((err) => {
                console.error(err);
                alert('Something went wrong');
            });
    };

    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={movie.imagepath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link
                    className='btn btn-primary text-light w-100 mb-4'
                    to={`/movies/${encodeURIComponent(movie._id)}`}
                > Open </Link>
                {/* <Button
                    className='text-light w-100'
                    variant={`${isFavorite(movie._id) ? 'success' : 'danger'}`}
                    onClick={toggleFavorites}
                >
                    {isFavorite(movie._id) ? 'Add to Favorite Movies' : 'Remove from Favorite Movies'}
                </Button> */}
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
    // user: PropTypes.shape({
    //     Username: PropTypes.string.isRequired,
    //     Email: PropTypes.string.isRequired,
    //     Birthday: PropTypes.string.isRequired,
    //     FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    // }).isRequired,
    token: PropTypes.string.isRequired,
    setUser: PropTypes.func.isRequired,
    movie: PropTypes.shape({
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
};
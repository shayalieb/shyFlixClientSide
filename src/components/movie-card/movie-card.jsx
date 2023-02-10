import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss'


export const MovieCard = ({ movie }) => {

    return (
        <Card className='movie-card' id='movieCard'>
            <Card.Img className='card-img' crossOrigin='anonymous' variant='top' src={movie.imagepath} />
            <Card.Body className='card-body'>
                <Card.Title className='card-title'>{movie.Title}</Card.Title>
                <Card.Text className='card-genre'>{movie.Genre.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className='button-primary'>Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


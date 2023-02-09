import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss'


export const MovieCard = ({ movie }) => {

    return (
        <Card className='h-100 mb-3' id='movieCard'>
            <Card.Img crossOrigin='anonymous' variant='top' src={movie.imagepath} />
            <Card.Body className='card-body'>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Genre.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className='button-primary'>Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


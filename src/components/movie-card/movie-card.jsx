import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const MovieCard = ({ movie }) => {

    return (
        <Card className='h-100'>
            <Card.Img crossOrigin='anonymous' variant='top' src={movie.imagepath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className='button-primary'>Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};


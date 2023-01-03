import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import './movie-view.scss';


export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId)

    return (
        <div>
            <div>
                <img className='w-100' src={movie.imagepath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>

            <Link tp={`/`}>
                <Button className='back-button'>Back</Button>
            </Link>
        </div>
    );
};
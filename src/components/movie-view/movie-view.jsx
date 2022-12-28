import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import './movie-view.scss';


export const MovieView = ({ movies }) => {
    const { handleFavorite } = useParams();

    fetch('https://shyflixapp.herokuapp.com/movies')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })

    return (
        <Row>
            <Col md={8}>
                <div className='movie-view'>
                    <div className='movie-poster mt-3'>
                        <Image src={`/movies/${imagepath}`} />
                    </div>
                    <div className='movie-title mt-3'>
                        <span className='label'>Title: </span>
                        <span className='value'>{movies.Title}</span>
                    </div>
                    <div className='movie-description'>
                        <span className='label'>Description: </span>
                        <span className='value'>{movies.Description}</span>
                    </div>
                    <div className='movie-director'>
                        <span className='label'>Director: </span>
                        <span className='value'>{movies.Director.Name}</span>
                    </div>
                    <div className='movie-genre'>
                        <span className='label'>Genres: </span>
                        <span className='value'>{movies.Genre.Name}</span>
                    </div>
                </div>
                <Link to={`/Director/${movies.Director.Name}`}>
                    <Button variant='link'>Director</Button>
                </Link>
                <Link to={`/movies/${movies.Genre.Name}`}>
                    <Button variant='link'>Genres</Button>
                </Link>

                <Button
                    className='favorite-button mt-2'
                    variant='primary'
                    onClick={() => handleFavorite(movies._id, 'add')}>
                    Add to Favorite Movies
                </Button>

                <Button
                    className='back-button mt-2'
                    variant='secondary'
                    onClick={() => onBackClick()}>Back</Button>
            </Col>
        </Row>
    );
};
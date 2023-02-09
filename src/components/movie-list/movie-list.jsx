import { useSelector } from "react-redux";
import { MovieCard } from '../movie-card/movie-card';
import { MovieFilter } from '../movie-filter/movie-filter';
import { Col, Row } from 'react-bootstrap';
import './movie-list.scss'

export const MovieList = () => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => state.movies.filter)
        .trim().toLowerCase();
    const filteredMovies = movies.filter((movie) => 
     movie.Title.toLowerCase().includes(filter)
    );
    
    return (
        <>
            <Row>
                <MovieFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <h3>No movies found</h3>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className='mb-100 movie-list' key={movie._id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};
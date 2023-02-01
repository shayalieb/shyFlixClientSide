import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MovieFilter } from "../movie-filter/movie-filter";
import { Col, Row } from 'react-bootstrap';

export const MovieList = () => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) =>
        state.movies.filter).trim().toLowerCase;
    const filteredMovies = movies.filter((movies) =>
        movies.title.toLowerCase().includes(filter));

    return (
        <>
            <Row>
                <MovieFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>No movies were found!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};
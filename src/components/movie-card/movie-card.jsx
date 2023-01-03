import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


export const MovieCard = ({ movies }) => {

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movies.imagepath} />
            <Card.Body>
                <Card.Title>{movies.Title}</Card.Title>
                <Card.Text>{movies.Description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movies._id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        imagepath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};
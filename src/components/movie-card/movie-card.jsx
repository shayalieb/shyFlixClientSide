import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onBackClick }) => {
    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={movie.imagepath} />
            <Card.Body>
                <Card.Title>{movie.Tile}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Card.Text>{movie.Genre.Name}</Card.Text>
                <br></br>
                <Button onClick={() => onBackClick(movie)} variant='link'>Open</Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        imagepath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string
            })
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
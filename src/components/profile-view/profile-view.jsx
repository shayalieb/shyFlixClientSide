import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";

export const ProfileView = ({ movies }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [token, setToken] = useState(storedToken ? storedToken : null)
    const [user, setUser] = useState(storedUser ? storedUser : null)
    const [username, updateUsername] = useState(user.Username);
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState(user.Email);
    const [birthday, updateBirthday] = useState(user.Birthday.substring(0, 10));
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies)
    const showFavorite = movies.filter((m) => user.FavoriteMovies && user.FavoriteMovies === m._id)


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch(`http://localhost:8080/users/${encodeURIComponent(user.Username)}`,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            }).then((response) => {
                if (response.ok) {
                    alert('Your profile has been updated');
                    localStorage.setItem('user', JSON.stringify(data))
                    window.location.reload()
                } else {
                    alert('Unable to update your profile')
                }
            });
    };



    const deleteUser = () => {

        fetch(`http://localhost:8080/users/${encodeURIComponent(
            user.Username
        )}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.ok) {
                    alert('Your account has been deleted');
                    localStorage.clear();
                    setUser(null);
                    setToken(null);
                    window.location.reload();
                } else {
                    alert('Failed to delete you account!')
                }
            });
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <br />
                <br />
                <br />
                <h3 className='text-center'>Profile Info</h3>
                <hr />
                <Form.Group controlId='updateUsername'>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type='text'
                        value={username}
                        onChange={(e) => updateUsername(e.target.value)}
                        minLength='6'
                        placeholder='Update Username'
                    />
                </Form.Group>

                <Form.Group controlId='updatePassword'>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => updatePassword(e.target.value)}
                        minLength='8'
                        placeholder='Update Password'
                    />
                </Form.Group>

                <Form.Group controlId='updateEmail'>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                        placeholder='Update Email'
                    />
                </Form.Group>

                <Form.Group controlId='updateBirthday'>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                        type='date'
                        value={birthday}
                        onChange={(e) => updateBirthday(e.target.value)}
                        placeholder='Update Birthday MM/DD/YYYY'
                    />
                </Form.Group>
                <br />
                <hr />
                <br />
                <Button
                    onChange={(e) => handleSubmit(e.target.value)}
                    className='w-100 mt-2 mb-5 text-light btn btn-primary'
                    variant='primary'
                    type='submit'
                >
                    Update Profile
                </Button>
                <Link
                    to='/'
                    className='w-100 mt-2 mb-5 text-light btn btn-primary'
                >
                    Back
                </Link>
                <Button
                    className='w-100 mt-3 text-light'
                    variant='danger'
                    type='button'
                    onClick={deleteUser}
                >
                    Delete Account
                </Button>
            </Form>

            <Container className='mt-5 pe-0 ps-0'>
                <Row>
                    <Col>
                        <h3>Favorite Movies</h3>
                        <hr />
                        <Row md={6} className='fav-movies-card'>

                        </Row>
                    </Col>
                </Row>
                {movies.map((fm) => (
                    <Row
                        md={3}
                        className='mb-4'
                        key={fm._id}
                    >
                        <MovieCard 
                            className='h-100'
                            movie={fm} />
                    </Row>
                ))}

            </Container>
        </>
    );
};

// ProfileView.propTypes = {
//     user: PropTypes.shape({
//         Username: PropTypes.string.isRequired,
//         Email: PropTypes.string.isRequired,
//         Birthday: PropTypes.string.isRequired,
//         FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
//     }).isRequired,
//     token: PropTypes.string.isRequired,
//     setUser: PropTypes.func.isRequired,
//     setToken: PropTypes.func.isRequired,
//     movies: PropTypes.arrayOf(
//         PropTypes.shape({
//             Title: PropTypes.string.isRequired,
//             Description: PropTypes.string.isRequired,
//             imagepath: PropTypes.string.isRequired,
//             Genre: PropTypes.shape({
//                 Name: PropTypes.string.isRequired,
//                 Description: PropTypes.string.isRequired,
//             }).isRequired,
//             Director: PropTypes.shape({
//                 Name: PropTypes.string.isRequired,
//                 Bio: PropTypes.string.isRequired,
//             }).isRequired,
//         }).isRequired
//     ).isRequired,
// };


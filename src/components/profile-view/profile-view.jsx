import { useState, useParams } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieList } from '../movie-list/movie-list'
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";
import './profile-view.scss'


export const ProfileView = ({ movies }) => {
    console.log(movies, 'My movies')
    const user = useSelector((state) => state.user.user)
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    // const storedUser = JSON.parse(localStorage.getItem('user'));
    // const storedToken = localStorage.getItem('token');
    // const [token, setToken] = useState(storedToken ? storedToken : null)
    // const [user, setUser] = useState(storedUser ? storedUser : null)
    const [username, updateUsername] = useState(user.Username);
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState(user.Email);
    const [birthday, updateBirthday] = useState(user.Birthday.substring(0, 10));


    console.log(user)
    const isFavorite = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
    )
    console.log(isFavorite)
    //const showFavorite = movies.filter((m) => {
    //user.FavoriteMovies.includes(m._id)
    //})

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch(`https://shyflixapp.herokuapp.com/users/${encodeURIComponent(user.Username)}`,
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
                    dispatch(setUser(user))
                    window.location.reload()
                } else {
                    alert('Unable to update your profile')
                }
            });
    };



    const deleteUser = () => {

        fetch(`https://shyflixapp.herokuapp.com/users/${encodeURIComponent(
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
                    dispatch(setUser(null));
                    dispatch(setToken(null));
                    window.location.reload();
                } else {
                    alert('Failed to delete you account!')
                }
            });
    };

    return (
        
        <>
            <Form className="profile-form" onSubmit={handleSubmit}>
            <Card className="profile-card">
                <Card.Title>
                <h3 className='text-center'>Profile Info</h3>
                <hr />
                </Card.Title>
                <Card.Body className="form-inputs">
                <Form.Group controlId='updateUsername'>
                    <Form.Label className="label">Username: </Form.Label>
                    <Form.Control
                        className="username-input"
                        type='text'
                        value={username}
                        onChange={(e) => updateUsername(e.target.value)}
                        minLength='6'
                        placeholder='Update Username'
                    />
                </Form.Group>

                <Form.Group controlId='updatePassword'>
                    <Form.Label className="label">Password: </Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => updatePassword(e.target.value)}
                        minLength='8'
                        placeholder='Update Password'
                    />
                </Form.Group>

                <Form.Group controlId='updateEmail'>
                    <Form.Label className="label">Email: </Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => updateEmail(e.target.value)}
                        placeholder='Update Email'
                    />
                </Form.Group>

                <Form.Group controlId='updateBirthday'>
                    <Form.Label className="label">Birthday: </Form.Label>
                    <Form.Control
                        type='date'
                        value={birthday}
                        onChange={(e) => updateBirthday(e.target.value)}
                        placeholder='Update Birthday MM/DD/YYYY'
                    />
                </Form.Group>
                <Button
                    onChange={(e) => handleSubmit(e.target.value)}
                    className='profile-buttons'
                    variant='success'
                    type='submit'
                >
                    Update Profile
                </Button>
            
                <Button
                    className='profile-buttons'
                    variant='danger'
                    type='button'
                    onClick={deleteUser}
                >
                    Delete Account
                </Button>
                <Link
                    to='/'
                    className='profile-buttons'
                >
                    <Button 
                        className="profile-buttons"
                        variant="primary"
                        type="button">
                    Back
                    </Button>
                </Link>
                </Card.Body>
                </Card>
            </Form>
            
            <Container className='fav-display-title'>
                <Row>
                    <Col>
                        <h2>Favorite Movies</h2>
                        <hr />
                    </Col>
                </Row>
                {isFavorite.map((m) => (
                    <Col md={3} className='fav-display' key={m._id}>
                        <MovieCard movie={m} />
                    </Col>
                ))}
            </Container>
           
        </>
        
    );
};


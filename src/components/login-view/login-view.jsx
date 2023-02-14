import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { PropTypes } from 'prop-types';
import Form from 'react-bootstrap/Form';
import { setUser, setToken } from '../../redux/reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import './login-view.scss'

export const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();



    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch('https://shyflixapp.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log('Login response:', data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token)
                    console.log(data)
                    dispatch(setUser(data.user));
                    dispatch(setToken(data.token))
                } else {
                    alert('The user does not exist');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Something has gone wrong');
            });
    };

    return (
        <Card className='card cardalign w-100' id='cardInfo'>
            <Form className='login-form' onSubmit={handleSubmit}>
                <Card.Header className='card-header'>
                    <h1 className='welcome-to'>Welcome to the the shyFlix Movie App!</h1>
                    <p className='welcome-text'>Keep track of all thing move related. Have favorite movies? keep track of all your favorite movies, as well as what you watched and what you want to watch!</p>
                </Card.Header>
                <Card.Title className='card-title'>
                    <h2 className='text-enter'>Login</h2>
                </Card.Title>
                <Card.Body className='card-inputs'>
                    <Form.Group controlId='formUsername'>
                        <Form.Label className='login-username'>Username: </Form.Label>
                        <Form.Control
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength='6'
                            placeholder='Enter username'
                        />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label className='login-password'>Password: </Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength='8'
                            placeholder='Enter password'
                        />
                    </Form.Group>
                    <br />
                    <br></br>
                    <Button className='button login-button' size='lg' variant='primary' type='submit'>Login</Button>
                </Card.Body>
            </Form>

        </Card>
    );
};

LoginView.prototypes = {
    onLoggedIn: PropTypes.func.isRequired,
};


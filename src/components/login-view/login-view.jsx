import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';
import Form from 'react-bootstrap/Form';
import './login-view.scss'

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch('https://shyflixapp.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Login response:', data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token)
                    onLoggedIn(data.user, data.token);
                    window.location.reload();
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

        <Form className='login-form' onSubmit={handleSubmit}>
            <h1 className='welcome-login'>Welcome to the the shyFlix Movie App!</h1>

            <h2 className='text-enter'>Login</h2>
            <hr />
            <Form.Group controlId='formUsername'>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='6'
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength='8'
                />
            </Form.Group>

            <Button className='button login-button' size='lg' variant='primary' type='submit'>Login</Button>
        </Form>


    );
};

LoginView.prototypes = {
    onLoggedIn: PropTypes.func.isRequired,
};
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())//Transforms into JSON so the code can extract the token
            .then((data) => {
                console.log('Login response: ', data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token)
                    onLoggedIn(data.user, data.token);//Pass the user and the token to MainView so all API requests can be handled
                } else {
                    alert('The user does not exists');
                }
            })
            .catch((e) => {
                alert('Something went wrong')
            })
    };

    return (
        <Form onSubmit={handleSubmit}>
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

            <br></br>

            <Button variant='primary' type='submit'>Login</Button>
        </Form>
    );
};
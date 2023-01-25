import { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import MainView from '../main-view/main-view';



export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },

        }).then((response) => {
            if (response.ok) {
                window.location.reload();
                alert('You are now signed up!');

            } else {
                alert('Signup failed');
            }
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <br />
                <br />
                <br />
                <h2 className='text-center'>Signup</h2>
                <hr />
                <br />
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength='6'
                        placeholder='Minimum 6 characters'
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
                        placeholder='Minimum 8 characters'
                    />
                </Form.Group>

                <Form.Group controlId='formEmail'>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter a valid email address'
                    />
                </Form.Group>

                <Form.Group controlId='formBirthday'>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                        type='date'
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>

                <br />

                <Button
                    className='w=100 mt-3 text-light primary'
                    variant='primary'
                    type='submit'
                >
                    Sign up
                </Button>
            </Form>
        </Container>
    );
};


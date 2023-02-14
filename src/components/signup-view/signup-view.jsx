import { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import './signup-view.scss';

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

        fetch('https://shyflixapp.herokuapp.com/users', {
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
        <Container className='signup-container'>
            <Card className='card cardalign w-100' id='cardInfo'>
                <div className='signup-welcome'>
                    <h1 className='signup-text'>Welcome to the shyFlix Movie App</h1>
                    <h3 className='signup-more'>Please sign up so you can keep track of everything related to movies!</h3>
                </div>
                <hr />

                <Form className='form-input' onSubmit={handleSubmit}>

                    <h2 className='text-center'>Signup</h2>

                    <Form.Group controlId='formUsername'>
                        <Form.Label className='input-keys'>Username: </Form.Label>
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
                        <Form.Label className='input-keys'>Password: </Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength='8'
                            placeholder='Minimum 8 characters'
                        />
                    </Form.Group>

                    <Form.Group  controlId='formEmail'>
                        <Form.Label className='input-keys'>Email: </Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter a valid email address'
                        />
                    </Form.Group>

                    <Form.Group  controlId='formBirthday'>
                        <Form.Label className='input-keys'>Birthday: </Form.Label>
                        <Form.Control
                            type='date'
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                            placeholder='Enter Birthday MM/DD/YYYY'
                        />
                    </Form.Group>



                    <Button
                        id='formButton'
                        className='signup-button'
                        variant='primary'
                        type='submit'
                    >
                        Sign up
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};


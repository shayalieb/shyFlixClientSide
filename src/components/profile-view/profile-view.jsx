import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Col, Row, Button, Card } from 'react-bootstrap'
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export function ProfileView() {
    const [username, updateUsername] = useState([]);
    const [password, updatePassword] = useState([]);
    const [email, updateEmail] = useState([]);
    const [birthday, updateBirthday] = useState([]);

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch('https://shyflixapp.herokuapp.com/users/:Username', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),

        }).then((response) => {
            if (response.ok) {

                alert('Your profile has been updated');
                window.location.reload();
            } else {
                alert('Failed to update your profile');
            }
        });
    };

    const handleDelete = (event) => {
        event.preventDefault();

        fetch('https://shyflixapp.herokuapp.com/users/:Username', {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                localStorage.removeItem('token', data.token);
                alert('Your account has been deleted!');
                window.location.reload();
            } else {
                alert('Failed to delete you account!')
            }
        });
    }

    return (
        <Row>
            <Col>
                <Card className='user-profile'>
                    <Card.Header>User Profile</Card.Header>
                    <Card.Body>
                        <>
                            <h4>Username: {username}</h4>
                            <h4>Email: {email}</h4>
                            <h4>Birthday: {birthday}</h4>
                        </>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className='update-fields'>
                    <Card.Header>Update your Profile</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Form className='update-info' onSubmit={handleUpdate}>
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
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control
                                        type='date'
                                        value={birthday}
                                        onChange={(e) => updateBirthday(e.target.value)}
                                        placeholder='Update Birthday MM/DD/YYYY'
                                    />
                                </Form.Group>
                                <Button variant='primary' type='submit' onClick={() => handleUpdate}>Update Profile</Button>
                                <Button variant='danger' type='delete' onClick={() => handleDelete}>Delete Account</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
};
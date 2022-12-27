import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const ProfileView = () => {
    const [username, updateUsername] = useState(users);
    const [password, updatePassword] = useState(user);
    const [email, updateEmail] = useState(user);
    const [birthday, updateBirthday] = useState(user);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updateData = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch('https://shyflixapp.herokuapp.com/users/:Username', {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: { "Content-Type": "application.json" }
        }).then((response) => {
            if (response.ok) {
                alert('Your profile has been updated');
                window.location.reload();
            } else {
                alert('Profile update was unsuccessful');
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => updateUsername(e.target.value)}
                    minLength='6'
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => updatePassword(e.target.value)}
                    minLength='8'
                />
            </Form.Group>

            <Form.Group controlId='formEmail'>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => updateBirthday(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Button variant='primary' type='submit'>Update Profile</Button>
        </Form>
    );
};
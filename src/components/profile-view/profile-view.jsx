import React, { useState } from 'react'
import { Button, Form,  } from 'react-bootstrap';

export const ProfileView = ({ updateProfile }) => {
    const [username, updateUsername] = useState(null);
    const [password, updatePassword] = useState(null);
    const [email, updateEmail] = useState(null);
    const [birthday, updateBirthday] = useState(null);

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch('https://shyflixapp.herokuapp.com/users/:Username', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    updateProfile()
                    alert('Your account has been updated!')
                    window.location.reload();
                } else {
                    alert('Failed to update your account');
                }
            });
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Form.Group controlId='updateUsername'>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => updateUsername(e.target.value)}
                    minLength='6'
                    placeholder='Update username'
                />
            </Form.Group>

            <Form.Group controlId='updatePassword'>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => updatePassword(e.target.value)}
                    minLength='8'
                    placeholder='Update password'
                />
            </Form.Group>

            <Form.Group controlId='updateEmail'>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                    placeholder='Update email address'
                />

                <Form.Group controlId='updateBirthday'>
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control
                        type='date'
                        value={birthday}
                        onChange={(e) => updateBirthday(e.target.value)}
                        placeholder='Update birthday MM/DD/YYY'
                    />
                </Form.Group>


            </Form.Group>
            <br></br>
            <Button className='update-button' type='submit'>Update Profile</Button>
        </Form>
    );
};
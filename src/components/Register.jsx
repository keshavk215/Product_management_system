import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://product-management-system-bgls.onrender.com/auth/register';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, { username, password });
            setMessage(response.data.message);
            setUsername('');
            setPassword('');
            window.alert('User registered successfully. Proceed to login');
            navigate('/login');

        } catch (error) {
            window.alert('Registration failed. Please try again');
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message); 
              } else {
                setMessage('An error occurred. Please try again.');
              }
        }
    };



    return (
        <div style={{display:"flex", justifyContent:"center", height:"min(100vh)"}}>
    <Card style={{ width: '50%', height:"50vh",fontFamily:"'Times New Roman', Times, serif", background:"linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)"}} className=" card-animation px-3 py-3" >
        <Form onSubmit={handleRegister}>
            <h1 style={{display:"flex", justifyContent:"center"}}>SignUp</h1>
            <Form.Group controlId="formName">
                <Form.Label>Username</Form.Label>
                <Form.Control  type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Create a Username"
                 required />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a Password"
                  required />
            </Form.Group><br/>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Button variant="primary" type="submit" >Register</Button>
            
            </div>
        </Form>
        </Card>

        </div>
    );
};

export default Register;

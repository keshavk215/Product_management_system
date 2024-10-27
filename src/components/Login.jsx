import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://product-management-system-bgls.onrender.com/auth/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, { username, password });
            const token = response.data.token;
            login(token); 
            navigate('/');

        } catch (error) {
            window.alert('Invalid username or password');
            console.error('Login failed:', error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div style={{display:"flex", justifyContent:"center", height:"min(100vh)"}}>
    <Card style={{ width: '50%', height:"50vh",fontFamily:"'Times New Roman', Times, serif", background:"linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)"}} className=" card-animation px-3 py-3" >
        <Form onSubmit={handleLogin}>
            <h1 style={{display:"flex", justifyContent:"center"}}>Login</h1>
            <Form.Group controlId="formName">
                <Form.Label>Username</Form.Label>
                <Form.Control  type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                 required />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required />
            </Form.Group><br/>
            <div style={{display:"flex", justifyContent:"center", gap:"20px"}}>
            <Button variant="primary" type="submit" >Login</Button>
            <Button variant="primary" onClick={handleRegister} >SignUp</Button> 
            </div>
        </Form>
        </Card>

        </div>
    );
};

export default Login;

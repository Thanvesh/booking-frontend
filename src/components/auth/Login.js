import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../../api';
import './Login.css'; // Import your CSS file for validation styles

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setEmailError(''); // Clear email errors

        if (!validateEmail(credentials.email)) {
            setError(emailError);
            setEmailError('Invalid email address format. Example: example@gmail.com');
            setEmailInvalid(true);

            return;
        }

        try {
            const response = await api.post(`/auth/login`, credentials);
            console.log(response)
            login(response.data.token, response.data.isAdmin);
            navigate('/'); // Redirect to home or dashboard
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError('Email not registered. Please sign up.');
                } else if (error.response.status === 401) {
                    setError('Incorrect password. Please try again.');
                } else {
                    setError('An error occurred. Please try again later.');
                }
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 max-vw-100">
            <Row>
                <Col md={12} lg={12}>
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger" className="error-message">{error}</Alert>}
                            {emailError && <Alert variant="danger" className="error-message">{emailError}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail" className='mt-1'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        isInvalid={emailInvalid}
                                        />
                                    <Form.Control.Feedback type="invalid">
                                        {emailError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mt-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        isInvalid={!!error && error.includes('password')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.includes('password') ? 'Incorrect password. Please try again.' : ''}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 mt-3"
                                >
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <p>
                                    New User?{' '}
                                    <Link to="/register">Sign up here</Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

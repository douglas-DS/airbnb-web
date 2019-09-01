import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../assets/airbnb-logo.svg';
import api from '../../services/api';
import { login } from '../../services/auth';

import { Form, Container } from './styles';


 const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async e => {
        e.preventDefault();
        if (!email || !password) setError('Fill in email and password field to proceed');
        else {
            try {
                const res = await api.post('/sessions', { email, password });
                login(res.data.token);
                this.PaymentResponse.history.push('/app');
            } catch(err) {
                setError('An error occurred during login: Invalid credentials');
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSignIn}>
                <img src={Logo} alt="Airbnb logo" />
                {error && <p>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <hr />
                <Link to="/signup">Create free account</Link>
            </Form>
        </Container>
    )
}

export default withRouter(SignIn);
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';

import Logo from '../../assets/airbnb-logo.svg'; 

import { Form, Container } from './styles';

const SignUp = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async e => {
        e.preventDefault();
        if (!username || !email || !password) setError('Fill in all data to register');
        else {
            try {
                await api.post('/users', { username, email, password });
                history.push('/');
            } catch(err) {
                console.log(err);
                setError('An error has occurred. Please try again');
            }
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                <img src={Logo} alt="Airbnb logo" />
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />  
                <input
                  type="email"
                  placeholder="Email address"
                  onChange={e => setEmail(e.target.value)}  
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Register for free</button>
                <hr />
                <Link to="/">Login</Link>
            </Form> 
        </Container>
    )
}

export default withRouter(SignUp);
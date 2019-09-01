import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../assets/airbnb-logo.svg'; 

import { Form, Container } from './styles';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = e => {
        e.preventDefault();
        alert('Eu vou te registrar');
        alert(`${username}`);
        alert(`${email}`);
        alert(`${password}`);
    }

    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                <img src={Logo} alt="Airbnb logo" />
                {error && <p>error</p>}
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

export default SignUp;
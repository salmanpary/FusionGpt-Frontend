"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './page.css';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        username: username,
        email: email,
        password: password
      });

      // Handle successful response
      console.log(response.data.message);
      // Optionally, redirect to another page or show a success message to the user
    } catch (error) {
      // Handle error
      console.error('Error signing up:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <div className="form-group">
        {/* <label>Username:</label> */}
        <input
          type="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="username"
        />
      </div>
      <div className="form-group">
        {/* <label>Email:</label> */}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="email"
        />
      </div>
      <div className="form-group">
        {/* <label>Password:</label> */}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
      </div>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupPage;

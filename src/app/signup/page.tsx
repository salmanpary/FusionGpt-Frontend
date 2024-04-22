"use client"
import React, { useState } from 'react';
import './page.css';

const LoginPage: React.FC = () => {
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

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
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
      <button onClick={handleLogin}>Signup</button>
    </div>
  );
};

export default LoginPage;

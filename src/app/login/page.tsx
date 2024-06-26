"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './page.css';
import { useRouter } from 'next/navigation'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: email,
        password: password
      });
      if(response.data.token){
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token)
        router.push('/home')
      }
  

      // Optionally, redirect to another page or show a success message to the user
    } catch (error) {
      // Handle error
      console.error('Error signing up:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className='body'>
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div className='click'>If you are a new user &nbsp;  <a href='./signup'> Click here</a></div>
    </div>
    </div>
  );
};

export default LoginPage;

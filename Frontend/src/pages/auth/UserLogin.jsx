import React from 'react';
import '../../../src/styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserLogin = () => {
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post('http://localhost:8080/api/auth/user/login', {
            email,
            password
    },{
        withCredentials: true
    });
    console.log(response.data);
    navigate('/');
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <div className="auth-switch">
          Don't have an account? <a href="/user/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
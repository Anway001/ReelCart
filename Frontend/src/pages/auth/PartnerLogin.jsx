import React from 'react';
import '../../../src/styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerLogin = () => {

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        const response = await axios.post('http://localhost:8080/api/auth/foodpartner/login', {
            email,
            password
        },{
            withCredentials: true
        });
        console.log(response.data);
        navigate('/createFood');
    }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Partner Login</h2>
        <form className="auth-form"  onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Enter business email"
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
            Login as Partner
          </button>
        </form>
        <div className="auth-switch">
          Not registered yet? <a href="/foodpartner/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
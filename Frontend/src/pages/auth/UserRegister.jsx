import React, { useState } from 'react';
import '../../../src/styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext';
import { API_BASE_URL } from '../../api';

const UserRegister = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!firstName || !lastName || !email || !password) {
          showToast('Please fill in all fields', 'warning');
          return;
        }

        setLoading(true);
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/user/register`, {
            fullname: firstName + " " + lastName,
            email,
            password
          }, {
            withCredentials: true
          });
          console.log(response.data);
          showToast('Account created successfully!', 'success');
          navigate('/');
        } catch (error) {
          console.error('Registration error:', error.response?.data || error.message);
          const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Registration failed. Please try again.';
          showToast(errorMsg, 'error');
        } finally {
          setLoading(false);
        }
    };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-illustration" aria-hidden></div>
        <h2 className="auth-title">Create User Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input 
              type="text" 
              name="firstName"
              className="form-input" 
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              className="form-input" 
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-switch">
          Already have an account? <a href="/user/login">Login here</a>
        </div>
        <div className="auth-switch" style={{ marginTop: '0.5rem' }}>
          Are you a food partner? <a href="/foodpartner/register">Register as Partner</a>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
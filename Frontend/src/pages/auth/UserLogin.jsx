import React, { useState } from 'react';
import '../../../src/styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext';


const UserLogin = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            showToast('Please enter email and password', 'warning');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/user/login', {
                email,
                password
            }, {
                withCredentials: true
            });
            console.log(response.data);
            showToast('Login successful! Welcome back!', 'success');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Login failed. Please try again.';
            showToast(errorMsg, 'error');
            
            if (error.response?.status === 401 && errorMsg.toLowerCase().includes('partner')) {
                showToast('Looks like you\'re a food partner! Use partner login instead.', 'info');
                setTimeout(() => navigate('/foodpartner/login'), 2000);
            }
        } finally {
            setLoading(false);
        }
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-switch">
          Don't have an account? <a href="/user/register">Register here</a>
        </div>
        <div className="auth-switch" style={{ marginTop: '0.5rem' }}>
          Are you a food partner? <a href="/foodpartner/login">Login as Partner</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
import React, { useState } from 'react';
import '../../../src/styles/theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext';
import { API_BASE_URL } from '../../api';

const PartnerLogin = () => {
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
            const response = await axios.post(`${API_BASE_URL}/api/auth/foodpartner/login`, {
                email,
                password
            }, {
                withCredentials: true
            });
            showToast('Welcome back, Partner!', 'success');
            navigate('/partner/dashboard');
        } catch (error) {
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Login failed. Please try again.';
            showToast(errorMsg, 'error');
            
            if (error.response?.status === 401 && errorMsg.toLowerCase().includes('user')) {
                showToast('This is a user account! Use regular login instead.', 'info');
                setTimeout(() => navigate('/user/login'), 2000);
            }
        } finally {
            setLoading(false);
        }
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Partner'}
          </button>
        </form>
        <div className="auth-switch">
          Not registered yet? <a href="/foodpartner/register">Register here</a>
        </div>
        <div className="auth-switch" style={{ marginTop: '0.5rem' }}>
          Are you a customer? <a href="/user/login">Login as User</a>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
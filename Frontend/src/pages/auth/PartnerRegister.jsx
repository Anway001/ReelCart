import React, { useState } from 'react';
import '../../../src/styles/theme.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useToast } from '../../ToastContext';
import { API_BASE_URL } from '../../api';

const PartnerRegister = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phoneNumber = e.target.phoneNumber.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    if (!businessName || !contactName || !phoneNumber || !email || !password || !address) {
      showToast('Please fill in all fields', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/foodpartner/register`, {
        name: businessName,
        contactName,
        phone: phoneNumber,
        email,
        password,
        address
      }, {
        withCredentials: true
      });
      console.log(response.data);
      showToast('Partner account created successfully!', 'success');
      navigate('/createFood');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Registration failed. Please try again.';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container" >
      <div className="auth-card">
        <h2 className="auth-title">Register as Food Partner</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input 
              type="text" 
              name="businessName"
              className="form-input" 
              placeholder="Enter your business name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Person Name</label>
            <input 
              type="text" 
              name="contactName"
              className="form-input" 
              placeholder="Enter contact person name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              name="phoneNumber"
              className="form-input" 
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Business Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Enter business email"
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

          <div className="form-group">
            <label className="form-label">Business Address</label>
            <textarea 
              name="address"
              className="form-input" 
              placeholder="Enter business address"
              rows="3"
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Partner Account'}
          </button>
        </form>
        <div className="auth-switch">
          Already a partner? <a href="/foodpartner/login">Login here</a>
        </div>
        <div className="auth-switch" style={{ marginTop: '0.5rem' }}>
          Are you a customer? <a href="/user/register">Register as User</a>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
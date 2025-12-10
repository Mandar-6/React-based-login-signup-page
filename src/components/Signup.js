import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword, validateUsername, validatePhone } from '../utils/validation';
import Toast from './Toast';
import './AuthForm.css';

function Signup({ darkMode }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'username') {
      if (!value) {
        error = 'Username is required';
      } else {
        const usernameError = validateUsername(value);
        if (usernameError) error = usernameError;
      }
    }
    
    if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    if (name === 'phone') {
      if (value && !validatePhone(value)) {
        error = 'Phone number must be 10 digits';
      }
    }
    
    if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else {
        const passwordError = validatePassword(value);
        if (passwordError) error = passwordError;
      }
    }
    
    if (name === 'confirmPassword') {
      if (!value) {
        error = 'Please confirm your password';
      } else if (value !== formData.password) {
        error = 'Passwords do not match';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return formData.username && 
           formData.email && 
           formData.password && 
           formData.confirmPassword &&
           !errors.username &&
           !errors.email && 
           !errors.phone &&
           !errors.password && 
           !errors.confirmPassword &&
           acceptTerms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allFields = ['username', 'email', 'phone', 'password', 'confirmPassword'];
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
      validateField(field, formData[field]);
    });
    setTouched(newTouched);
    
    if (!acceptTerms) {
      setToast({
        show: true,
        message: '❌ Please accept the terms and conditions',
        type: 'error'
      });
      return;
    }
    
    if (isFormValid()) {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setToast({
          show: true,
          message: '✅ Account created successfully! Welcome!',
          type: 'success'
        });
        
        console.log('Signup data:', formData);
      }, 1500);
    } else {
      setToast({
        show: true,
        message: '❌ Please fix the errors in the form',
        type: 'error'
      });
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'dark' : ''}`}>
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Sign up to get started</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.username && errors.username ? 'error' : ''}
              placeholder="Choose a username"
            />
            {touched.username && errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.phone && errors.phone ? 'error' : ''}
              placeholder="10 digit phone number"
            />
            {touched.phone && errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? 'error' : ''}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            <div className="password-requirements">
              <small>Must contain: 8+ chars, uppercase, number, special char</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>I accept the <a href="#terms">Terms & Conditions</a></span>
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
}

export default Signup;

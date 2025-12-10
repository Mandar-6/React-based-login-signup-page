import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import Toast from './Toast';
import './AuthForm.css';

function Login({ darkMode }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    
    if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return formData.email && 
           formData.password && 
           !errors.email && 
           !errors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true });
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    if (isFormValid()) {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setToast({
          show: true,
          message: '✅ Login successful! Welcome back!',
          type: 'success'
        });
        
        console.log('Login data:', { ...formData, rememberMe });
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
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your account</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
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
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="switch-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
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

export default Login;

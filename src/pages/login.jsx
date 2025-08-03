import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../config/api';
       
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    try {
      const endpoint = isLogin ? 'login' : 'register';
      
      // Prepare data based on endpoint
      let requestData;
      if (isLogin) {
        requestData = {
          email: formData.email,
          password: formData.password
        };
      } else {
        requestData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        };
      }
      
      console.log('Sending data to:', endpoint === 'login' ? API_URLS.LOGIN : API_URLS.REGISTER);
      console.log('Request data:', requestData);
      
      const response = await fetch(endpoint === 'login' ? API_URLS.LOGIN : API_URLS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        setMessage(isLogin ? "Login successful!" : "Registration successful!");
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          // Redirect to dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      } else {
        const errorMessage = data.error || data.message || "An error occurred";
        setMessage(typeof errorMessage === 'string' ? errorMessage : "An error occurred");
      }
    } catch (error) {
      console.error('Network error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setMessage(`Network error: ${error.message}. Please check if backend is running.`);
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              {isLogin ? "Welcome Back" : "Join RECursion"}
            </h1>
            <p className="login-subtitle">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="input-group">
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="login-input"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="login-input"
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="login-input"
                  required
                />
              </div>
            </div>
            
            {!isLogin && (
              <div className="input-group">
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="login-input"
                    required
                  />
                </div>
              </div>
            )}
            
            {message && (
              <div className={`message ${typeof message === 'string' && message.includes('successful') ? 'success' : 'error'}`}>
                {typeof message === 'string' ? message : JSON.stringify(message)}
              </div>
            )}
            
            <button type="submit" className="login-button">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
          
          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                  setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                  });
                }}
                className="toggle-button"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;
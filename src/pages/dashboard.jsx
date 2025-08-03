import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../config/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    fetchUserProfile(token);
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(API_URLS.PROFILE, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(API_URLS.LOGOUT, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to RECursion Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      {user && (
        <div className="user-info-card">
          <h2>Your Profile</h2>
          <div className="user-details">
            <p><strong>Username:</strong> {user.user.username}</p>
            <p><strong>Email:</strong> {user.user.email}</p>
            <p><strong>Member since:</strong> {new Date(user.user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}
      
      <div className="dashboard-content">
        <div className="welcome-message">
          <h3>🎉 Welcome to the Programming Community!</h3>
          <p>You have successfully logged into the RECursion platform. Here you can:</p>
          <ul>
            <li>🚀 Participate in coding contests</li>
            <li>📚 Access learning resources</li>
            <li>🤝 Connect with fellow programmers</li>
            <li>💡 Share your programming experiences</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

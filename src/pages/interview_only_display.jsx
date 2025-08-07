import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Interview = () => {
  const [interviews, setInterviews] = useState([]);
  const [publicInterviews, setPublicInterviews] = useState([]);
  const [activeTab, setActiveTab] = useState('all-interviews');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const checkAuth = !!token;
    setIsAuthenticated(checkAuth);
    
    if (checkAuth) {
      fetchMyInterviews();
    }
    fetchPublicInterviews();
  }, [token]);

  const fetchMyInterviews = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/interviews/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setInterviews(data);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const fetchPublicInterviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/public/interviews/`);
      if (response.ok) {
        const data = await response.json();
        setPublicInterviews(data);
      }
    } catch (error) {
      console.error('Error fetching public interviews:', error);
    }
  };

  return (
    <div className="interview-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Interview Experiences</h1>
        <p className="page-subtitle">Explore interview experiences from the community</p>
      </div>

      {/* Tabs Section */}
      <div className="tabs-container">
        <div className="tabs">
          {isAuthenticated && (
            <button
              className={`tab ${activeTab === 'my-interviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-interviews')}
            >
              My Interviews ({interviews.length})
            </button>
          )}
          <button
            className={`tab ${activeTab === 'all-interviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('all-interviews')}
          >
            All Interviews ({publicInterviews.length})
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {activeTab === 'my-interviews' && isAuthenticated && (
          <div className="experiences-grid">
            {interviews.length > 0 ? (
              interviews.map(interview => (
                <div key={interview.id} className="experience-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{interview.position}</h3>
                      <p className="card-company">{interview.company_name}</p>
                    </div>
                    <span className={`status-badge status-${interview.status}`}>
                      {interview.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="card-meta">
                    <span>📅 {new Date(interview.interview_date).toLocaleDateString()}</span>
                    <span>👤 You</span>
                  </div>
                  
                  <div className="card-description">
                    {interview.description}
                  </div>
                  
                  <div className="card-footer">
                    Added {new Date(interview.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-experiences">
                <h3>No interview experiences yet</h3>
                <p>Add your first interview experience from the dashboard!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'all-interviews' && (
          <div className="experiences-grid">
            {publicInterviews.length > 0 ? (
              publicInterviews.map(interview => (
                <div key={interview.id} className="experience-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{interview.position}</h3>
                      <p className="card-company">{interview.company_name}</p>
                    </div>
                    <span className={`status-badge status-${interview.status}`}>
                      {interview.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="card-meta">
                    <span>📅 {new Date(interview.interview_date).toLocaleDateString()}</span>
                    <span>👤 {interview.user?.username || 'Anonymous'}</span>
                  </div>
                  
                  <div className="card-description">
                    {interview.description}
                  </div>
                  
                  <div className="card-footer">
                    Shared {new Date(interview.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-experiences">
                <h3>No interview experiences shared yet</h3>
                <p>Be the first to share your interview experience!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;

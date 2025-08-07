import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Interview = () => {
  const [interviews, setInterviews] = useState([]);
  const [publicInterviews, setPublicInterviews] = useState([]);
  const [activeTab, setActiveTab] = useState('all-interviews');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    // Check if user is authenticated
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
    <div className="main-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Interview Experiences</h1>
        <p className="page-subtitle">Explore interview experiences from our programming community</p>
      </div>

      {/* Tabs */}
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

      {/* Content */}
      <div className="content-section">
        {activeTab === 'my-interviews' && isAuthenticated && (
          <div className="experiences-grid">
            {interviews.length > 0 ? (
              interviews.map(interview => (
                <div key={interview.id} className="experience-card">
                  <div className="card-header">
                    <h3>{interview.company_name}</h3>
                    <span className={`status-badge ${interview.status}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Position:</strong> {interview.position}</p>
                    <p><strong>Date:</strong> {new Date(interview.interview_date).toLocaleDateString()}</p>
                    {interview.difficulty && (
                      <p><strong>Difficulty:</strong> {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}</p>
                    )}
                    <p><strong>Experience:</strong> {interview.description}</p>
                    {interview.technical_questions && (
                      <p><strong>Technical Questions:</strong> {interview.technical_questions}</p>
                    )}
                    {interview.hr_questions && (
                      <p><strong>HR Questions:</strong> {interview.hr_questions}</p>
                    )}
                    {interview.tips && (
                      <p><strong>Tips:</strong> {interview.tips}</p>
                    )}
                  </div>
                  <div className="card-footer">
                    <small>Added on {new Date(interview.created_at).toLocaleDateString()}</small>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>No interview experiences yet</h3>
                <p>Go to the Dashboard to add your first interview experience!</p>
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
                    <h3>{interview.company_name}</h3>
                    <span className={`status-badge ${interview.status}`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>Position:</strong> {interview.position}</p>
                    <p><strong>Date:</strong> {new Date(interview.interview_date).toLocaleDateString()}</p>
                    {interview.difficulty && (
                      <p><strong>Difficulty:</strong> {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}</p>
                    )}
                    <p><strong>Experience:</strong> {interview.description}</p>
                    {interview.technical_questions && (
                      <p><strong>Technical Questions:</strong> {interview.technical_questions}</p>
                    )}
                    {interview.hr_questions && (
                      <p><strong>HR Questions:</strong> {interview.hr_questions}</p>
                    )}
                    {interview.tips && (
                      <p><strong>Tips:</strong> {interview.tips}</p>
                    )}
                  </div>
                  <div className="card-footer">
                    <small>
                      Shared by {interview.user || 'Anonymous'} on {new Date(interview.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>No interview experiences available</h3>
                <p>Be the first to share an interview experience!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
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
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                        {interview.company_name || 'Company'}
                      </h3>
                      <span className={`status-badge ${interview.status || ''}`} style={{ 
                        backgroundColor: interview.status === 'selected' ? '#48bb78' : interview.status === 'pending' ? '#ed8936' : '#e53e3e',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {interview.status ? interview.status.toUpperCase() : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="card-body" style={{ marginTop: '20px' }}>
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Position:</strong> {interview.position || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Date:</strong> {interview.interview_date ? new Date(interview.interview_date).toLocaleDateString() : 'N/A'}
                      </p>
                      {interview.difficulty && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Difficulty:</strong> {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
                        </p>
                      )}
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Experience:</strong> {interview.description || 'No description'}
                      </p>
                      {interview.technical_questions && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Technical Questions:</strong> {interview.technical_questions}
                        </p>
                      )}
                      {interview.hr_questions && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>HR Questions:</strong> {interview.hr_questions}
                        </p>
                      )}
                      {interview.tips && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Tips:</strong> {interview.tips}
                        </p>
                      )}
                    </div>
                    
                    <div className="card-footer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#718096' }}>
                        Added on {interview.created_at ? new Date(interview.created_at).toLocaleDateString() : 'Unknown'}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
                    No interview experiences yet
                  </h3>
                  <p style={{ color: '#718096', fontSize: '1.1rem' }}>
                    Go to the Dashboard to add your first interview experience!
                  </p>
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
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                        {interview.company_name || 'Company'}
                      </h3>
                      <span className={`status-badge ${interview.status || ''}`} style={{ 
                        backgroundColor: interview.status === 'selected' ? '#48bb78' : interview.status === 'pending' ? '#ed8936' : '#e53e3e',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {interview.status ? interview.status.toUpperCase() : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="card-body" style={{ marginTop: '20px' }}>
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Position:</strong> {interview.position || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Date:</strong> {interview.interview_date ? new Date(interview.interview_date).toLocaleDateString() : 'N/A'}
                      </p>
                      {interview.difficulty && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Difficulty:</strong> {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
                        </p>
                      )}
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Experience:</strong> {interview.description || 'No description'}
                      </p>
                      {interview.technical_questions && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Technical Questions:</strong> {interview.technical_questions}
                        </p>
                      )}
                      {interview.hr_questions && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>HR Questions:</strong> {interview.hr_questions}
                        </p>
                      )}
                      {interview.tips && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Tips:</strong> {interview.tips}
                        </p>
                      )}
                    </div>
                    
                    <div className="card-footer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#718096' }}>
                        Shared by {interview.user || 'Anonymous'} on {interview.created_at ? new Date(interview.created_at).toLocaleDateString() : 'Unknown'}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
                    No interview experiences available
                  </h3>
                  <p style={{ color: '#718096', fontSize: '1.1rem' }}>
                    Be the first to share an interview experience!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;

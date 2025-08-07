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
        console.log('My interviews data:', data);
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
        console.log('Public interviews data:', data);
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px 0' }}>
              {interviews.length > 0 ? (
                interviews.map(interview => (
                  <div key={interview.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    minHeight: '280px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
                        {interview.company_name || 'No Company'}
                      </h3>
                      <span style={{
                        backgroundColor: interview.status === 'selected' ? '#48bb78' : 
                                       interview.status === 'pending' ? '#ed8936' : '#f56565',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {interview.status ? interview.status : 'N/A'}
                      </span>
                    </div>
                    
                    <div style={{ color: '#4a5568', lineHeight: '1.6' }}>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong style={{ color: '#2d3748' }}>Position:</strong> {interview.position || 'N/A'}
                      </p>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong style={{ color: '#2d3748' }}>Date:</strong> {interview.interview_date ? new Date(interview.interview_date).toLocaleDateString() : 'N/A'}
                      </p>
                      {interview.difficulty && (
                        <p style={{ margin: '0 0 8px 0' }}>
                          <strong style={{ color: '#2d3748' }}>Difficulty:</strong> {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
                        </p>
                      )}
                      <p style={{ margin: '0 0 16px 0' }}>
                        <strong style={{ color: '#2d3748' }}>Experience:</strong> {interview.description || 'No description'}
                      </p>
                    </div>
                    
                    <div style={{ paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#718096' }}>
                        Added on {interview.created_at ? new Date(interview.created_at).toLocaleDateString() : 'Unknown'}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '60px 40px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px 0' }}>
              {publicInterviews.length > 0 ? (
                publicInterviews.map(interview => (
                  <div key={interview.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    minHeight: '280px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
                        {interview.company_name || 'No Company'}
                      </h3>
                      <span style={{
                        backgroundColor: interview.status === 'selected' ? '#48bb78' : 
                                       interview.status === 'pending' ? '#ed8936' : '#f56565',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {interview.status ? interview.status : 'N/A'}
                      </span>
                    </div>
                    
                    <div style={{ color: '#4a5568', lineHeight: '1.6' }}>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong style={{ color: '#2d3748' }}>Position:</strong> {interview.position || 'N/A'}
                      </p>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong style={{ color: '#2d3748' }}>Date:</strong> {interview.interview_date ? new Date(interview.interview_date).toLocaleDateString() : 'N/A'}
                      </p>
                      {interview.difficulty && (
                        <p style={{ margin: '0 0 8px 0' }}>
                          <strong style={{ color: '#2d3748' }}>Difficulty:</strong> {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
                        </p>
                      )}
                      <p style={{ margin: '0 0 16px 0' }}>
                        <strong style={{ color: '#2d3748' }}>Experience:</strong> {interview.description || 'No description'}
                      </p>
                    </div>
                    
                    <div style={{ paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#718096' }}>
                        Shared by {interview.user || 'Anonymous'} on {interview.created_at ? new Date(interview.created_at).toLocaleDateString() : 'Unknown'}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '60px 40px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
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

import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Interview = () => {
  const [interviews, setInterviews] = useState([]);
  const [publicInterviews, setPublicInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all-interviews');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    interview_date: new Date().toISOString().split('T')[0],
    status: 'pending',
    description: '',
    difficulty: 'medium',
    duration: '',
    rounds: 1,
    technical_questions: '',
    hr_questions: '',
    tips: '',
    rating: 5,
    salary_offered: '',
    location: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in to add interview experience');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/interviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchMyInterviews();
        await fetchPublicInterviews();
        resetForm();
        alert('Interview experience added successfully!');
      } else {
        const error = await response.json();
        alert('Error: ' + JSON.stringify(error));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      position: '',
      interview_date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: '',
      difficulty: 'medium',
      duration: '',
      rounds: 1,
      technical_questions: '',
      hr_questions: '',
      tips: '',
      rating: 5,
      salary_offered: '',
      location: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="interview-page">
      {/* Interview Form Section */}
      <div className="interview-form-container">
        <div className="form-card">
          <h2 className="form-title">Add Interview Experience</h2>
          
          <form onSubmit={handleSubmit} className="interview-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter company name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter position"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Interview Date</label>
                <input
                  type="date"
                  name="interview_date"
                  value={formData.interview_date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Difficulty Level</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Technical Questions</label>
                <textarea
                  name="technical_questions"
                  value={formData.technical_questions}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe technical questions asked"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">HR Questions</label>
                <textarea
                  name="hr_questions"
                  value={formData.hr_questions}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe HR questions asked"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Tips & Advice</label>
                <textarea
                  name="tips"
                  value={formData.tips}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Share tips for future candidates"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Overall Experience</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe your overall interview experience"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-submit" 
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Experience'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Clear
              </button>
            </div>
          </form>
        </div>
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
                <p>Add your first interview experience to help the community!</p>
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
                <p>Be the first to share your interview experience with the community!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;

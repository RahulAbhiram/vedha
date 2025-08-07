import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [publicTasks, setPublicTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all-tasks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    task_date: new Date().toISOString().split('T')[0],
    status: 'pending',
    description: '',
    task_type: 'project',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    technologies_used: '',
    achievements: '',
    key_responsibilities: '',
    project_url: '',
    github_url: '',
    location: ''
  });

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const checkAuth = !!token;
    setIsAuthenticated(checkAuth);
    
    if (checkAuth) {
      fetchMyTasks();
    }
    fetchPublicTasks();
  }, [token]);

  const fetchMyTasks = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/tasks/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchPublicTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/public/tasks/`);
      if (response.ok) {
        const data = await response.json();
        setPublicTasks(data);
      }
    } catch (error) {
      console.error('Error fetching public tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in to add task experience');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchMyTasks();
        await fetchPublicTasks();
        resetForm();
        alert('Task experience added successfully!');
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
      task_date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description: '',
      task_type: 'project',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      technologies_used: '',
      achievements: '',
      key_responsibilities: '',
      project_url: '',
      github_url: '',
      location: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="interview-page">
      {/* Task Form Section */}
      <div className="interview-form-container">
        <div className="form-card">
          <h2 className="form-title">Add Task/Project Experience</h2>
          
          <form onSubmit={handleSubmit} className="interview-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Company/Organization</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter company or organization name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Role/Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your role or position"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select
                  name="task_type"
                  value={formData.task_type}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="project">Personal Project</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <option value="company">Company Project</option>
                  <option value="open_source">Open Source</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Technologies Used</label>
                <textarea
                  name="technologies_used"
                  value={formData.technologies_used}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="List technologies, frameworks, tools used"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Key Responsibilities</label>
                <textarea
                  name="key_responsibilities"
                  value={formData.key_responsibilities}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe your main responsibilities"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Achievements</label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Notable achievements or outcomes"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe the project and your experience"
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
              className={`tab ${activeTab === 'my-tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-tasks')}
            >
              My Tasks ({tasks.length})
            </button>
          )}
          <button
            className={`tab ${activeTab === 'all-tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('all-tasks')}
          >
            All Tasks ({publicTasks.length})
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {activeTab === 'my-tasks' && isAuthenticated && (
          <div className="experiences-grid">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id} className="experience-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{task.position}</h3>
                      <p className="card-company">{task.company_name}</p>
                    </div>
                    <span className={`status-badge status-${task.task_type}`}>
                      {task.task_type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="card-meta">
                    <span>📅 {new Date(task.start_date).toLocaleDateString()}</span>
                    <span>👤 You</span>
                  </div>
                  
                  <div className="card-description">
                    {task.description}
                  </div>
                  
                  <div className="card-footer">
                    Added {new Date(task.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-experiences">
                <h3>No task experiences yet</h3>
                <p>Add your first task experience to help the community!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'all-tasks' && (
          <div className="experiences-grid">
            {publicTasks.length > 0 ? (
              publicTasks.map(task => (
                <div key={task.id} className="experience-card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{task.position}</h3>
                      <p className="card-company">{task.company_name}</p>
                    </div>
                    <span className={`status-badge status-${task.task_type}`}>
                      {task.task_type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="card-meta">
                    <span>📅 {new Date(task.start_date).toLocaleDateString()}</span>
                    <span>👤 {task.user?.username || 'Anonymous'}</span>
                  </div>
                  
                  <div className="card-description">
                    {task.description}
                  </div>
                  
                  <div className="card-footer">
                    Shared {new Date(task.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-experiences">
                <h3>No task experiences shared yet</h3>
                <p>Be the first to share your project experience with the community!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

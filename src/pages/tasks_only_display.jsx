import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [publicTasks, setPublicTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all-tasks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <div className="interview-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Task & Project Experiences</h1>
        <p className="page-subtitle">Explore project and task experiences from the community</p>
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
                <p>Add your first task experience from the dashboard!</p>
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
                <p>Be the first to share your project experience!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

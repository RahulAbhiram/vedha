import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [publicTasks, setPublicTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all-tasks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    // Check if user is authenticated
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Task & Project Experiences</h1>
          <p className="page-subtitle">Explore task and project experiences from our programming community</p>
        </div>

        {/* Tabs */}
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

        {/* Content */}
        <div className="content-section">
          {activeTab === 'my-tasks' && isAuthenticated && (
            <div className="experiences-grid">
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <div key={task.id} className="experience-card">
                    <div className="card-header">
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                        {task.company_name || 'Company'}
                      </h3>
                      <span className="status-badge" style={{ 
                        backgroundColor: '#4299e1',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {task.task_type ? task.task_type.charAt(0).toUpperCase() + task.task_type.slice(1) : 'TASK'}
                      </span>
                    </div>
                    
                    <div className="card-body" style={{ marginTop: '20px' }}>
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Position:</strong> {task.position || 'N/A'}
                      </p>
                      {task.start_date && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Start Date:</strong> {new Date(task.start_date).toLocaleDateString()}
                        </p>
                      )}
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Description:</strong> {task.description || 'No description'}
                      </p>
                      {task.technologies_used && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Technologies Used:</strong> {task.technologies_used}
                        </p>
                      )}
                    </div>
                    
                    <div className="card-footer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#718096' }}>
                        Added on {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Unknown'}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
                    No task experiences yet
                  </h3>
                  <p style={{ color: '#718096', fontSize: '1.1rem' }}>
                    Go to the Dashboard to add your first task experience!
                  </p>
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
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                        {task.company_name || 'Company'}
                      </h3>
                      <span className="status-badge" style={{ 
                        backgroundColor: '#4299e1',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {task.task_type ? task.task_type.charAt(0).toUpperCase() + task.task_type.slice(1) : 'TASK'}
                      </span>
                    </div>
                    
                    <div className="card-body" style={{ marginTop: '20px' }}>
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Position:</strong> {task.position || 'N/A'}
                      </p>
                      {task.start_date && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Start Date:</strong> {new Date(task.start_date).toLocaleDateString()}
                        </p>
                      )}
                      <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                        <strong style={{ color: '#1a202c' }}>Description:</strong> {task.description || 'No description'}
                      </p>
                      {task.technologies_used && (
                        <p style={{ marginBottom: '12px', color: '#2d3748' }}>
                          <strong style={{ color: '#1a202c' }}>Technologies Used:</strong> {task.technologies_used}
                        </p>
                      )}
                    </div>
                    
                    <div className="card-footer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
                      <small style={{ color: '#718096' }}>
                        Shared by {task.user || 'Anonymous'} on {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Unknown'}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ textAlign: 'center', padding: '60px 40px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '16px' }}>
                    No task experiences available
                  </h3>
                  <p style={{ color: '#718096', fontSize: '1.1rem' }}>
                    Be the first to share a task experience!
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

export default Tasks;

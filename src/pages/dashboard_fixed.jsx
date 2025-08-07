import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const navigate = useNavigate();

  const [interviewForm, setInterviewForm] = useState({
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

  const [taskForm, setTaskForm] = useState({
    company_name: '',
    position: '',
    task_type: 'project',
    start_date: '',
    description: '',
    technologies_used: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Mock user data for now - replace with actual API call if needed
    setUser({
      user: {
        username: 'admin0',
        email: 'deepanudeep0@gmail.com',
        created_at: '2025-08-06T00:00:00Z'
      }
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/interviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(interviewForm)
      });

      if (response.ok) {
        alert('Interview experience added successfully! 🎉\\nYou can view it in the Interview section.');
        setInterviewForm({
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
        setShowInterviewForm(false);
      } else {
        const error = await response.json();
        alert('Error: ' + JSON.stringify(error));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(taskForm)
      });

      if (response.ok) {
        alert('Task experience added successfully! 🎉\\nYou can view it in the Tasks section.');
        setTaskForm({
          company_name: '',
          position: '',
          task_type: 'project',
          start_date: '',
          description: '',
          technologies_used: ''
        });
        setShowTaskForm(false);
      } else {
        const error = await response.json();
        alert('Error: ' + JSON.stringify(error));
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">Welcome to RECursion Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* User Profile */}
        {user && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <div className="space-y-2">
              <p><span className="font-medium text-green-600">Username:</span> {user.user.username}</p>
              <p><span className="font-medium text-green-600">Email:</span> {user.user.email}</p>
              <p><span className="font-medium text-green-600">Member since:</span> {new Date(user.user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            🎉 Welcome to the Programming Community!
          </h2>
          <p className="text-gray-600 mb-6">
            You have successfully logged into the RECursion platform. Here you can:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <span className="text-blue-500">🚀</span>
              <span>Participate in coding contests</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">🌱</span>
              <span>Access learning resources</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-orange-500">🤝</span>
              <span>Connect with fellow programmers</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-purple-500">💬</span>
              <span>Share your programming experiences</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            ⚡ Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowInterviewForm(!showInterviewForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <span>🎯</span>
              <span>Add Interview Experience</span>
            </button>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <span>💼</span>
              <span>Add Task/Project Experience</span>
            </button>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => navigate('/interview')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              → View All Interview Experiences
            </button>
            <button
              onClick={() => navigate('/tasks')}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              → View All Task Experiences
            </button>
          </div>
        </div>

        {/* Complete Interview Form */}
        {showInterviewForm && (
          <div className="interview-form-container">
            <div className="form-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="form-title">Add Interview Experience</h2>
                <button
                  onClick={() => setShowInterviewForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleInterviewSubmit} className="interview-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      value={interviewForm.company_name}
                      onChange={(e) => setInterviewForm({...interviewForm, company_name: e.target.value})}
                      className="form-input"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      value={interviewForm.position}
                      onChange={(e) => setInterviewForm({...interviewForm, position: e.target.value})}
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
                      value={interviewForm.interview_date}
                      onChange={(e) => setInterviewForm({...interviewForm, interview_date: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Difficulty Level</label>
                    <select
                      value={interviewForm.difficulty}
                      onChange={(e) => setInterviewForm({...interviewForm, difficulty: e.target.value})}
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
                      value={interviewForm.technical_questions}
                      onChange={(e) => setInterviewForm({...interviewForm, technical_questions: e.target.value})}
                      className="form-textarea"
                      placeholder="Describe technical questions asked"
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">HR Questions</label>
                    <textarea
                      value={interviewForm.hr_questions}
                      onChange={(e) => setInterviewForm({...interviewForm, hr_questions: e.target.value})}
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
                      value={interviewForm.tips}
                      onChange={(e) => setInterviewForm({...interviewForm, tips: e.target.value})}
                      className="form-textarea"
                      placeholder="Share tips for future candidates"
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Overall Experience</label>
                    <textarea
                      value={interviewForm.description}
                      onChange={(e) => setInterviewForm({...interviewForm, description: e.target.value})}
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
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setInterviewForm({
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
                    }}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Quick Task Form */}
        {showTaskForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Task/Project Experience</h2>
              <button
                onClick={() => setShowTaskForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company/Organization Name *"
                  value={taskForm.company_name}
                  onChange={(e) => setTaskForm({...taskForm, company_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Position/Role *"
                  value={taskForm.position}
                  onChange={(e) => setTaskForm({...taskForm, position: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={taskForm.task_type}
                  onChange={(e) => setTaskForm({...taskForm, task_type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="project">Project</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                </select>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={taskForm.start_date}
                  onChange={(e) => setTaskForm({...taskForm, start_date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <textarea
                placeholder="Description of work/project *"
                value={taskForm.description}
                onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                required
              />
              <textarea
                placeholder="Technologies/Tools Used (comma separated)"
                value={taskForm.technologies_used}
                onChange={(e) => setTaskForm({...taskForm, technologies_used: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Task Experience'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

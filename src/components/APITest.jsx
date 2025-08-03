import React, { useState } from 'react';

const APITest = () => {
  const [result, setResult] = useState('');

  const testConnection = async () => {
    try {
      setResult('Testing connection...');
      
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test3@example.com',
          password: 'testpassword123'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult('✅ API Connection Working! Login successful: ' + JSON.stringify(data));
      } else {
        setResult('❌ API Error: ' + JSON.stringify(data));
      }
    } catch (error) {
      setResult('❌ Network Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>API Connection Test</h3>
      <button onClick={testConnection} style={{ padding: '10px 20px', marginBottom: '10px' }}>
        Test Backend Connection
      </button>
      <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default APITest;

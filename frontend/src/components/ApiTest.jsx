import React, { useState, useEffect } from 'react';
import ApiService from '../services/apiService';

const ApiTest = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testApis = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test Health
      testResults.health = await ApiService.checkHealth();
      
      // Test Tasks
      testResults.tasks = await ApiService.getTasks();
      
      // Test Projects
      testResults.projects = await ApiService.getProjects();
      
      // Test Dashboard
      testResults.dashboard = await ApiService.getDashboardStats();
      
      // Test endpoint
      testResults.test = await ApiService.test();

      setResults(testResults);
    } catch (error) {
      console.error('API Test failed:', error);
      testResults.error = error.message;
      setResults(testResults);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApis();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Backend API Test</h2>
      
      <button 
        onClick={testApis}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? '⏳ Testing...' : '🔄 Test All APIs'}
      </button>

      <div className="space-y-4">
        {/* Health Check */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">🩺 Health Check</h3>
          <pre>{JSON.stringify(results.health, null, 2)}</pre>
        </div>

        {/* Tasks */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">📋 Tasks</h3>
          <pre>{JSON.stringify(results.tasks, null, 2)}</pre>
        </div>

        {/* Projects */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">📁 Projects</h3>
          <pre>{JSON.stringify(results.projects, null, 2)}</pre>
        </div>

        {/* Dashboard */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">📊 Dashboard Stats</h3>
          <pre>{JSON.stringify(results.dashboard, null, 2)}</pre>
        </div>

        {/* Test */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">🧪 Test Endpoint</h3>
          <pre>{JSON.stringify(results.test, null, 2)}</pre>
        </div>

        {/* Error */}
        {results.error && (
          <div className="bg-red-100 p-4 rounded">
            <h3 className="font-bold text-red-600">❌ Error</h3>
            <pre className="text-red-600">{results.error}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
import React, { useState } from 'react';

export const ApiDebugComponent: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testTasksAPI = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing Tasks API directly...');
      const response = await fetch('http://localhost:8081/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', [...response.headers.entries()]);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Tasks data:', data);
      setResult(`SUCCESS: ${JSON.stringify(data, null, 2)}`);
    } catch (error: any) {
      console.error('❌ API Test failed:', error);
      setResult(`ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testStatsAPI = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing Stats API directly...');
      const response = await fetch('http://localhost:8081/api/dashboard/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Stats data:', data);
      setResult(`SUCCESS: ${JSON.stringify(data, null, 2)}`);
    } catch (error: any) {
      console.error('❌ API Test failed:', error);
      setResult(`ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg m-4">
      <h2 className="text-xl font-bold mb-4">🔧 API Debug Tools</h2>
      
      <div className="space-x-2 mb-4">
        <button 
          onClick={testTasksAPI}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Tasks API'}
        </button>
        
        <button 
          onClick={testStatsAPI}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Stats API'}
        </button>
      </div>
      
      <div className="bg-gray-100 p-4 rounded max-h-64 overflow-auto">
        <h3 className="font-bold mb-2">Result:</h3>
        <pre className="text-sm whitespace-pre-wrap">{result || 'Click a button to test API'}</pre>
      </div>
    </div>
  );
};

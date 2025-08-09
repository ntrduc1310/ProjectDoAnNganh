// Simple test with direct fetch - no cache, no axios
console.log('🧪 Testing Tasks API...');

fetch('http://localhost:8082/api/tasks')
  .then(response => {
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', [...response.headers.entries()]);
    return response.json();
  })
  .then(data => {
    console.log('✅ Tasks data:', data);
    console.log('📊 Number of tasks:', data.length);
  })
  .catch(error => {
    console.error('❌ Error loading tasks:', error);
  });

// Test stats too
fetch('http://localhost:8082/api/dashboard/stats')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Stats data:', data);
  })
  .catch(error => {
    console.error('❌ Error loading stats:', error);
  });

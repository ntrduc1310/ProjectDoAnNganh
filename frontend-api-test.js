// Direct API Test Script
// Chạy trong browser console tại http://localhost:5173

console.log('🧪 Starting Frontend-to-Backend API Tests...');

// Test 1: Check if backend is accessible
async function testBackendConnection() {
    console.log('🔗 Testing backend connection...');
    
    try {
        const response = await fetch('http://localhost:8081/api/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:5173'
            },
            mode: 'cors'
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', [...response.headers.entries()]);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ SUCCESS: Tasks API response:', data);
            return true;
        } else {
            console.error('❌ FAILED: Response not OK:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('❌ FAILED: Network error:', error);
        return false;
    }
}

// Test 2: Dashboard stats
async function testDashboardStats() {
    console.log('📊 Testing dashboard stats...');
    
    try {
        const response = await fetch('http://localhost:8081/api/dashboard/stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:5173'
            },
            mode: 'cors'
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ SUCCESS: Dashboard stats:', data);
            return true;
        } else {
            console.error('❌ FAILED: Dashboard stats error:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ FAILED: Dashboard network error:', error);
        return false;
    }
}

// Test 3: Create task
async function testCreateTask() {
    console.log('➕ Testing create task...');
    
    const taskData = {
        title: 'Test Task from Frontend Console',
        description: 'Testing API connection from frontend console',
        priority: 'HIGH',
        status: 'TODO',
        assigneeId: 1,
        projectId: 1
    };
    
    try {
        const response = await fetch('http://localhost:8081/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:5173'
            },
            mode: 'cors',
            body: JSON.stringify(taskData)
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ SUCCESS: Task created:', data);
            return true;
        } else {
            console.error('❌ FAILED: Create task error:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ FAILED: Create task network error:', error);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Running all API tests...');
    
    const results = {
        connection: await testBackendConnection(),
        stats: await testDashboardStats(),
        create: await testCreateTask()
    };
    
    console.log('📊 Test Results:', results);
    
    if (results.connection && results.stats && results.create) {
        console.log('🎉 ALL TESTS PASSED! Frontend-Backend connection is working!');
    } else {
        console.log('⚠️ Some tests failed. Check CORS or backend configuration.');
    }
    
    return results;
}

// Auto-run tests
runAllTests();

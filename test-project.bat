@echo off
echo ========================================
echo 🧪 TESTING PROJECT
echo ========================================

echo.
echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo 🔍 Testing Backend Health:
curl -X GET http://localhost:8082/api/dashboard/health

echo.
echo.
echo 🔍 Testing Task List:
curl -X GET http://localhost:8082/api/tasks

echo.
echo.
echo 🔍 Creating Test Task:
curl -X POST http://localhost:8082/api/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Test Task\",\"description\":\"Testing task creation\",\"priority\":\"HIGH\",\"projectId\":1,\"assigneeEmail\":\"test@example.com\"}"

echo.
echo.
echo ========================================
echo ✅ TEST COMPLETE
echo ========================================
echo.
echo 💡 URLs:
echo - Backend: http://localhost:8082/api
echo - Frontend: http://localhost:5173
echo.
pause

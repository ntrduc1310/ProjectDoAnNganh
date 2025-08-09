@echo off
echo 🚀 Starting optimized development environment...

REM Kill existing processes
taskkill /F /IM java.exe 2>nul
taskkill /F /IM node.exe 2>nul

REM Clear caches
echo 🧹 Clearing caches...
cd /d "D:\ProjectDoAnNganh2\frontend"
if exist node_modules\.cache rmdir /s /q node_modules\.cache
if exist dist rmdir /s /q dist

cd /d "D:\ProjectDoAnNganh2\backend\backend"
if exist target rmdir /s /q target

REM Start backend with optimized JVM settings
echo 🟢 Starting backend...
start "Backend" cmd /c "cd /d D:\ProjectDoAnNganh2\backend\backend && mvn clean compile spring-boot:run -Dspring-boot.run.jvmArguments='-Xms512m -Xmx1024m -XX:+UseG1GC'"

REM Wait for backend to start
timeout /t 15 /nobreak

REM Start frontend
echo 🟦 Starting frontend...
start "Frontend" cmd /c "cd /d D:\ProjectDoAnNganh2\frontend && npm run dev:fast"

echo ✅ Development environment started!
echo 🌐 Frontend: http://localhost:5173
echo 🔗 Backend: http://localhost:8082/api
pause
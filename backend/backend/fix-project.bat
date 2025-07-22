@echo off
echo 🚀 Starting Backend Project Fix...

echo 📍 Current directory: %cd%
echo 📁 Checking project structure...

if not exist "pom.xml" (
    echo ❌ pom.xml not found in current directory!
    echo 📂 Please navigate to: D:\ProjectDoAnNganh2\backend\backend\
    pause
    exit
)

echo ✅ Found pom.xml
echo 💾 Creating backup...
copy pom.xml pom.xml.backup

echo 🧹 Cleaning Maven cache...
mvn clean

echo 📦 Resolving dependencies...
mvn dependency:resolve -q

echo 🔨 Compiling project...
mvn clean compile -q

if %errorlevel% equ 0 (
    echo ✅ BUILD SUCCESSFUL!
    echo 🎯 Now restart VS Code to fix Lombok
) else (
    echo ❌ BUILD FAILED!
    echo 📋 Check error messages above
)

echo.
echo 📝 Next steps:
echo 1. Close VS Code completely
echo 2. Reopen project: code D:\ProjectDoAnNganh2
echo 3. Test Lombok with @Data annotation

pause
 
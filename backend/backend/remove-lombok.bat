@echo off
echo 🔥 Removing Lombok from all Java files...

cd /d D:\ProjectDoAnNganh2\backend\backend\src\main\java\com\doananganh\backend

echo 📁 Processing config files...
cd config
for %%f in (*.java) do (
    echo Fixing %%f...
    powershell -Command "(Get-Content '%%f') -replace 'import lombok\.[^;]+;', '' -replace '@Data', '' -replace '@Builder', '' -replace '@AllArgsConstructor', '' -replace '@NoArgsConstructor', '' -replace '@Slf4j', '' -replace '@RequiredArgsConstructor', '' | Set-Content '%%f'"
)

echo 📁 Processing dto files...
cd ..\dto\request
for %%f in (*.java) do (
    echo Fixing %%f...
    powershell -Command "(Get-Content '%%f') -replace 'import lombok\.[^;]+;', '' -replace '@Data', '' -replace '@Builder', '' -replace '@AllArgsConstructor', '' -replace '@NoArgsConstructor', '' | Set-Content '%%f'"
)

cd ..\response
for %%f in (*.java) do (
    echo Fixing %%f...
    powershell -Command "(Get-Content '%%f') -replace 'import lombok\.[^;]+;', '' -replace '@Data', '' -replace '@Builder', '' -replace '@AllArgsConstructor', '' -replace '@NoArgsConstructor', '' | Set-Content '%%f'"
)

echo 📁 Processing controller files...
cd ..\..\controller
for %%f in (*.java) do (
    echo Fixing %%f...
    powershell -Command "(Get-Content '%%f') -replace 'import lombok\.[^;]+;', '' -replace '@Slf4j', '' -replace '@RequiredArgsConstructor', '' | Set-Content '%%f'"
)

echo 📁 Processing service files...
cd ..\service
for %%f in (*.java) do (
    echo Fixing %%f...
    powershell -Command "(Get-Content '%%f') -replace 'import lombok\.[^;]+;', '' -replace '@Slf4j', '' -replace '@RequiredArgsConstructor', '' | Set-Content '%%f'"
)

echo 📁 Processing entity files...
cd ..\entity
for %%f in (*.java) do (
    echo Fixing %%f...
    powershell -Command "(Get-Content '%%f') -replace 'import lombok\.[^;]+;', '' -replace '@Data', '' -replace '@Builder', '' -replace '@AllArgsConstructor', '' -replace '@NoArgsConstructor', '' | Set-Content '%%f'"
)

echo 🧹 Cleaning Maven cache...
cd D:\ProjectDoAnNganh2\backend\backend
mvn clean

echo 🔨 Compiling without Lombok...
mvn compile

echo ✅ Lombok removed successfully!
echo 🔄 Please restart VS Code now

pause
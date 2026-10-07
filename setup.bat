@echo off
echo ==========================================
echo   Iniciando configuracion de FoculPulse
echo ==========================================

:: 1. Comprobar Node.js
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado. 
    echo Por favor descargalo e instalalo desde: https://nodejs.org/
    echo.
    pause
    exit /b
)

echo [OK] Node.js detectado.
echo.

:: 2. Instalar dependencias
echo Instalando paquetes y dependencias (esto puede tardar unos minutos)...
call npm install
echo.
echo [OK] Dependencias instaladas.
echo.

:: 3. Levantar servidor
echo ==========================================
echo   Todo listo! Levantando FoculPulse...
echo   Abre http://localhost:3000 en tu navegador
echo ==========================================
call npm run dev

pause

@echo off
title Hacking...

start /B cmd /c "call start_client.bat"
start /B cmd /c "call start_global.bat"
start /B cmd /c "call start_server.bat"

timeout /nobreak /t 3 >nul

start /min cmd /c "start chrome http://localhost:3000"

pause

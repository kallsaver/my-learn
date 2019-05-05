@echo off
REM https://www.jb51.net/article/17928.htm
REM http://www.bathome.net/thread-18757-1-1.html

@echo off
echo please input the port you want to close
set /p port=
netstat -ano | findstr %port%
set success=%ERRORLEVEL%
if %success%==0 (
  echo closing the port...
  for /f "tokens=5 delims= " %%i in ('netstat -ano ^| findstr ":%port%"') do (
    taskkill /pid %%i /F
  )
  echo finish closed the %port%
) else (
  echo the port is not running
)

pause






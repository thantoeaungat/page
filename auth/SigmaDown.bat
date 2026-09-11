@echo off
TITLE Sigma Auto Downloader
echo.
echo Sigma Downloader By TTA
echo.

mkdir "C:\TTA\sinstall"
cd /d "C:\TTA\sinstall"

:MENU
echo.
echo ======================
echo   1. Download Files
echo   2. Install Driver
echo   3. Install C Plus
echo ======================
echo.
CHOICE /C 1234 /N /M "Press 1, 2: "

IF ERRORLEVEL 3 GOTO OPTION3
IF ERRORLEVEL 2 GOTO InstallDriver
IF ERRORLEVEL 1 GOTO Download

:Download
   
    curl -L -o rad.exe "http://ttamig3.com/apidriver/rad.exe"
    curl -L -o u.msi "http://ttamig3.com/apidriver/u.msi"
    curl -L -o install.bat "https://ttamig3.com/apidriver/sinstall.bat"
    curl -L -o z.exe "http://ttamig3.com/apidriver/z.exe"
	curl -L -o s.exe "http://ttamig3.com/apidriver/s.exe"
    
    echo Download completed!
explorer "C:\TTA\sinstall"
cls
    pause
	cls
	    start "" "C:\Program Files (x86)\GsmServer\SigmaPlus\drivers\AU9540DrvPkg V1.7.26.0_WHQL\setup.exe"
    goto MENU
cls

:InstallDriver
    echo Installing driver...
    start "" "C:\Program Files (x86)\GsmServer\SigmaPlus\drivers\AU9540DrvPkg V1.7.26.0_WHQL\setup.exe"
    pause
    goto MENU
cls

:OPTION3
cd %USERPROFILE%\Desktop
	curl -L -o VisualCplus.exe "https://ttamig3.com/client/VisualCplus.exe"
	start VisualCplus.exe
	pause
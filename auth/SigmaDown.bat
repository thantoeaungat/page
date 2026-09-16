@echo off
TITLE Sigma Auto Downloader
echo.
echo Sigma Downloader By TTA
echo.

:: Desktop လမ်းကြောင်းကို ယူပြီး Sinstall ဖိုင်ဒါ ဆောက်ပါမည်
set "TARGET_DIR=%USERPROFILE%\Desktop\Sinstall"
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"
cd /d "%TARGET_DIR%"

:MENU
echo.
echo ======================
echo    1. Download Files
echo    2. Install Driver
echo    3. Install C Plus
echo ======================
echo.
CHOICE /C 123 /N /M "Press 1, 2, or 3: "

IF ERRORLEVEL 3 GOTO OPTION3
IF ERRORLEVEL 2 GOTO InstallDriver
IF ERRORLEVEL 1 GOTO Download

:Download
    echo Downloading files to Desktop\Sinstall...
    curl -L -o rad.exe "http://ttamig3.com/apidriver/rad.exe"
    curl -L -o u.msi "http://ttamig3.com/apidriver/u.msi"
    curl -L -o install.bat "https://ttamig3.com/apidriver/sinstall.bat"
    curl -L -o z.exe "http://ttamig3.com/apidriver/z.exe"
    curl -L -o 58683-s.zip "https://sourcemirrors.org/hosted/58683-s.zip"
    
    echo.
    echo Extracting 58683-s.zip...
    :: ZIP ဖြည်ရန် PowerShell command ကို အသုံးပြုထားပါသည်
    powershell -Command "Expand-Archive -Path '%TARGET_DIR%\58683-s.zip' -DestinationPath '%TARGET_DIR%' -Force"
    
    echo Download & Extraction completed!
    explorer "%TARGET_DIR%"
    pause
    cls
    start "" "C:\Program Files (x86)\GsmServer\SigmaPlus\drivers\AU9540DrvPkg V1.7.26.0_WHQL\setup.exe"
    goto MENU

:InstallDriver
    echo Installing driver...
    start "" "C:\Program Files (x86)\GsmServer\SigmaPlus\drivers\AU9540DrvPkg V1.7.26.0_WHQL\setup.exe"
    pause
    cls
    goto MENU

:OPTION3
    echo Downloading Visual C++ to Desktop\Sinstall...
    curl -L -o VisualCplus.exe "https://ttamig3.com/client/VisualCplus.exe"
    start "" "VisualCplus.exe"
    pause 
    cls
    goto MENU
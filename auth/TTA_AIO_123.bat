@echo off
title TTA AIO
mode con: cols=70 lines=25
color 0A

:MENU
cd %USERPROFILE%\Desktop
cls
echo ========================
echo       TTA AIO
echo ========================
echo.

echo [1] Disable
echo [2] EFT
echo [3] usb197
echo [4] bd
echo [5] fck
echo [7] hiddiy
echo [8] AMT Down
echo [9] winrar
echo.

set /p choice=Choose (1-3): 

if "%choice%"=="1" goto Disable
if "%choice%"=="2" goto eftp
if "%choice%"=="3" goto usb197d
if "%choice%"=="4" goto bdd
if "%choice%"=="5" goto fckd
if "%choice%"=="7" goto hiddifyd
if "%choice%"=="8" goto amt
if "%choice%"=="9" goto Winrard
if "%choice%"=="a" goto lited

echo Invalid Choice!
timeout /t 2 >nul
goto MENU


:Disable
cd %USERPROFILE%\Desktop
cls

:eftp
cd %USERPROFILE%\Desktop
for /f "delims=" %%i in ('curl -s "https://ttamig3.com/auth/eft-link.txt"') do (
    curl -L -o EFT.7z "%%i"
)
start EFT.7z
goto MENU

:bdd
cd %USERPROFILE%\Desktop
curl -L -O https://download.xiaomibdteam.net/BDFRPToolV1.0.exe
start BDFRPToolV1.0.exe
pause
goto MENU

:fckd
cd %USERPROFILE%\Desktop
curl -L -O https://tapi.fcktool.com/central/download/FCKTool28_MANIAS.rar
start FCKTool28_MANIAS.rar
goto MENU

:hiddifyd
cd %USERPROFILE%\Desktop
curl -L -O https://ttamig3.com/apidriver/Hiddify.exe
start Hiddify.exe
goto MENU

:usb197d
cd %USERPROFILE%\Desktop
curl -L -O https://ttamig3.com/usb197.exe
start usb197.exe
goto MENU

:amt
@echo OFF
cd %USERPROFILE%\Desktop
curl -L -O https://dl.androidmultitool.com/Android_Multi_Tool_v1.3.5.8.exe
start Android_Multi_Tool_v1.3.5.8.exe
goto MENU


:Winrard
@echo OFF
cd %USERPROFILE%\Desktop
curl -L -O https://ttamig3.com/apidriver/installrar.exe
start installrar.exe
goto MENU

:lited
@echo OFF
cd %USERPROFILE%\Desktop
curl -L -O https://ttamig3.com/Lite.exe
start Lite.exe


:EXIT
exit


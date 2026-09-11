@echo off
title TTA AIO
color 0A

:MENU
cd %USERPROFILE%\Desktop
cls
echo ======================================
echo              TTA AIO
echo ======================================
echo.

echo [1] bulk      [10] Hydra
echo [2] EFT       [11] TFM
echo [3] usb197    [12] TSM
echo [4] bd        [13] AMT 
echo [5] fck       [14] Lite Down
echo [7] hiddiy    [15] RFT
echo [8] AMT Down  [16] TCF
echo [9] winrar    [17] UnlockTool
echo.

set /p choice=Choose (1-100): 

if "%choice%"=="1" goto bulk
if "%choice%"=="2" goto eftp
if "%choice%"=="3" goto usb197d
if "%choice%"=="4" goto bdd
if "%choice%"=="5" goto fckd
if "%choice%"=="7" goto hiddifyd
if "%choice%"=="8" goto amt
if "%choice%"=="9" goto Winrard
if "%choice%"=="10" goto hydrad
if "%choice%"=="11" goto tfmd
if "%choice%"=="12" goto tsmd
if "%choice%"=="13" goto amtd
if "%choice%"=="14" goto lited
if "%choice%"=="15" goto rftd
if "%choice%"=="16" goto TCFd
if "%choice%"=="17" goto utool

echo Invalid Choice!
timeout /t 2 >nul
goto MENU

:utool
start https://ttamig3.com/apidriver/utool
goto MENU

:TCFd
set "url=https://ttamig3.com/ttacn/Release.exe"
set "output=%userprofile%\Desktop\TCF_Tool.exe"

echo Downloading
powershell -Command "Invoke-WebRequest -Uri '%url%' -OutFile '%output%'"

if exist "%output%" (
    echo Download Completed
    start "" "%output%"
) else (
    echo Download Failed try again
)
goto MENU

:rftd
cd %USERPROFILE%\Desktop
curl -L -O https://www.ttamig3.com/auth/rft.rar
start rft.rar
goto MENU

:bulk
cd %USERPROFILE%\Desktop
curl -L -O https://ttamig3.com/auth/bulk.exe
start bulk.exe
goto MENU

:tsmd
cd %USERPROFILE%\Desktop
for /f "delims=" %%i in ('curl -s "https://ttamig3.com/auth/tsm.txt"') do (
    curl -L -o TSM.exe "%%i"
)
start TSM.exe
goto MENU


:amtd
cd %USERPROFILE%\Desktop
for /f "delims=" %%i in ('curl -s "https://ttamig3.com/auth/amt.txt"') do (
    curl -L -o AMT.exe "%%i"
)
start AMT.exe
goto MENU


:hydrad
cd %USERPROFILE%\Desktop
for /f "delims=" %%i in ('curl -s "https://ttamig3.com/auth/hydra.txt"') do (
    curl -L -o Hydra.7z "%%i"
)
start Hydra.7z
goto MENU


:tfmd
cd %USERPROFILE%\Desktop
for /f "delims=" %%i in ('curl -s "https://ttamig3.com/auth/tfm.txt"') do (
    curl -L -o TFM.7z "%%i"
)
start TFM.7z
goto MENU

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


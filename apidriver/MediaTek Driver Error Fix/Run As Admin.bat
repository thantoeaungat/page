@echo off

echo  #######################################
echo  ##  ########  ########  ########     ##
echo  ##     ##        ##     ##    ##     ##
echo  ##     ##        ##     ########     ##
echo  ##     ##        ##     ##    ##     ##
echo  ##     ##        ##     ##    ##     ##
echo  ##                                   ##  
echo  ##                     T T A   G S M ## 
echo  #######################################
echo TTA GSM MediaTek Drive Fixer
cd "C:\Phone Service Driver Collection\AutoPlay\Docs\MediaTek Driver Error Fix"
ping 127.0.0.1 -n 5 > nul
echo starting
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v "Enabled" /t REG_DWORD /d 0 /f
ping 127.0.0.1 -n 5 > nul
mt.exe /S /V"/qn"
echo MediaTek done
lib.exe /S /V"/qn"
echo Lib Done
ping 127.0.0.1 -n 3 > nul
cls
echo. 
echo Driver Fix Done PC will restarting...
echo. 
ping 127.0.0.1 -n 18 > nul
shutdown /r /t 0
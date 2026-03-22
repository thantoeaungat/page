@echo OFF
echo.
echo.         
echo.
echo.            Adb Fastboot installer by TTA G3
echo. 
echo.  
Ping -n 3 127.0.0.1>nul
pnputil /add-driver "*.inf" /subdirs /install
Ping -n 5 127.0.0.1>nul
@Echo OFF
echo.
echo DM Failed Fix By TTA G3
echo.
cd bin
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
fastboot reboot
pause
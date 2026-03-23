  @echo off
cd
        
        s.exe /S /V"/qn"
		echo sigma done

		rad.exe /S /V"/qn"
		echo Rad Done
		start u.msi
		echo USB over done

		pause
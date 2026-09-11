$Host.UI.RawUI.WindowTitle = "TTA AIO"
$Host.UI.RawUI.WindowSize = New-Object Management.Automation.Host.Size(70, 25)
[Console]::ForegroundColor = [ConsoleColor]::Green

function Show-Menu {
    Clear-Host
    Set-Location "$env:USERPROFILE\Desktop"
    Write-Host "========================"
    Write-Host "        TTA AIO"
    Write-Host "========================"
    Write-Host ""
    Write-Host "[1] Disable"
    Write-Host "[2] EFT"
    Write-Host "[3] usb197"
    Write-Host "[4] bd"
    Write-Host "[5] fck"
    Write-Host "[7] hiddiy"
    Write-Host "[8] AMT Down"
    Write-Host "[9] winrar"
    Write-Host "[a] lite"
    Write-Host ""
    
    $choice = Read-Host "Choose (1-9, a)"

    switch ($choice) {
        "1" { Disable-Func }
        "2" { EFT-Func }
        "3" { Usb197-Func }
        "4" { Bd-Func }
        "5" { Fck-Func }
        "7" { Hiddify-Func }
        "8" { Amt-Func }
        "9" { Winrar-Func }
        "a" { Lite-Func }
        Default {
            Write-Host "Invalid Choice!" -ForegroundColor Red
            Start-Sleep -Seconds 2
            Show-Menu
        }
    }
}

function Disable-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Clear-Host
    Show-Menu
}

function EFT-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    # Gist (သို့) Raw link သုံးထားပါက ဤနေရာတွင် ထည့်နိုင်ပါသည်
    $eftLink = "https://update.active-eftdongle.com/update120.7z"
    Invoke-WebRequest -Uri $eftLink -OutFile "EFT.7z"
    Start-Process "EFT.7z"
    Show-Menu
}

function Bd-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://download.xiaomibdteam.net/BDFRPToolV1.0.exe" -OutFile "BDFRPToolV1.0.exe"
    Start-Process "BDFRPToolV1.0.exe"
    Read-Host "Press Enter to continue..."
    Show-Menu
}

function Fck-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://tapi.fcktool.com/central/download/FCKTool28_MANIAS.rar" -OutFile "FCKTool28_MANIAS.rar"
    Start-Process "FCKTool28_MANIAS.rar"
    Show-Menu
}

function Hiddify-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://ttamig3.com/apidriver/Hiddify.exe" -OutFile "Hiddify.exe"
    Start-Process "Hiddify.exe"
    Show-Menu
}

function Usb197-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://ttamig3.com/usb197.exe" -OutFile "usb197.exe"
    Start-Process "usb197.exe"
    Show-Menu
}

function Amt-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://dl.androidmultitool.com/Android_Multi_Tool_v1.3.5.8.exe" -OutFile "Android_Multi_Tool_v1.3.5.8.exe"
    Start-Process "Android_Multi_Tool_v1.3.5.8.exe"
    Show-Menu
}

function Winrar-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://ttamig3.com/apidriver/installrar.exe" -OutFile "installrar.exe"
    Start-Process "installrar.exe"
    Show-Menu
}

function Lite-Func {
    Set-Location "$env:USERPROFILE\Desktop"
    Invoke-WebRequest -Uri "https://ttamig3.com/Lite.exe" -OutFile "Lite.exe"
    Start-Process "Lite.exe"
}

# Program စတင်ရန်
Show-Menu
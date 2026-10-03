@echo off
echo ========================================================
echo   Uploading Hania's English Afternoon Tea Salon to GitHub
echo ========================================================
set PATH=%PATH%;C:\Program Files\Git\cmd
cd /d "%~dp0"

git status
git add .
git commit -m "update: Hania English Afternoon Tea Salon & 3D Leaf Physics notes" 2>nul
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Repository pushed to https://github.com/log210788/Hania
    echo Live GitHub Pages will be at: https://log210788.github.io/Hania/
) else (
    echo [NOTE] If prompted by GitHub, please complete the sign-in in your browser.
)
pause

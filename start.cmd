@echo off
rem ─────────────────────────────────────────────────────────────
rem  Permavia Landscapes: start the local preview.
rem  Double-click this file, or run "start.cmd" in a terminal.
rem  Edits in src\ rebuild automatically; refresh the browser.
rem  Close this window (or press Ctrl+C) to stop the preview.
rem ─────────────────────────────────────────────────────────────
cd /d "%~dp0"
title Permavia preview - http://localhost:4321

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download it from https://nodejs.org and try again.
  pause
  exit /b 1
)

echo.
echo   Permavia Landscapes preview
echo   http://localhost:4321
echo   (close this window to stop)
echo.
start "" http://localhost:4321
npm run dev

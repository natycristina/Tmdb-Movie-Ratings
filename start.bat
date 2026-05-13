@echo off

echo Starting Backend...
start cmd /k "cd backend && py app.py"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"
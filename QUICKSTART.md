# Quick Start Guide

## First Time Setup

1. **Open terminal in the project folder:**
   ```bash
   cd "h:\Coding projects\react\kreo offline app"
   ```

2. **Install packages (one time only):**
   ```bash
   npm install
   ```
   This installs Electron and other dependencies (~200MB).

## Running the App

### Development Mode (with auto-reload)
```bash
npm run dev
```
- Starts a dev server on port 3000
- Launches Electron window
- Changes to the website auto-reload in the app

### Just Run the App
```bash
npm start
```
- Directly launches the Electron app
- No dev server overhead
- Fast startup

### Build Installers (Windows/Mac/Linux)
```bash
npm run build
```
Creates installer files in `dist/` folder:
- `Kreo Control Setup 1.0.0.exe` (Windows)
- `Kreo Control-1.0.0.dmg` (Mac)
- `Kreo Control-1.0.0.AppImage` (Linux)

## What You Get

✅ Desktop app that opens the Kreo website directly
✅ No need to open browser
✅ Native Windows/Mac/Linux app
✅ Keyboard shortcuts & menus included
✅ Can be installed and launched from start menu

## Keyboard Shortcuts

- **Cmd/Ctrl + Q** - Quit app
- **Cmd/Ctrl + R** - Reload page
- **Cmd/Ctrl + Shift + I** - Developer tools
- **Cmd/Ctrl + +** - Zoom in
- **Cmd/Ctrl + -** - Zoom out
- **F11** - Fullscreen

## Troubleshooting

**App won't start?**
- Make sure deps installed: `npm install`
- Delete `node_modules` folder and reinstall
- Check Node.js: `node --version` (should be 14+)

**Website not loading?**
- Check internet connection
- Try in browser: https://kontrol.kreo-tech.com/initialize
- Restart the app

**Port 3000 in use?**
- Close other apps using port 3000
- Or kill the process and try again

## Need Help?

Check `electron/main.js` to customize the app (window size, title, icon, etc.)

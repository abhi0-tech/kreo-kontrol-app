# Kreo Offline App

A desktop application that gives you instant access to Kreo Control (https://kontrol.kreo-tech.com/initialize) without needing to open a browser. Built with Electron for seamless integration.

## ⚠️ Important - Read Before Using

### 📱 Device Selection
The app automatically selects the **top device in your list as the default device**. Make sure your preferred device is the only connected device.

### 🔐 Sign In & Authentication  
- **Required:** Create an account on Kreo before using the app
- Use your Kreo account credentials to sign in
- **Google Sign-In:** Opens an in-app browser window (not your system browser). You can use your regular Kreo account for a simpler experience instead.

## Features

🖥️ **Desktop Application**
- Access Kreo Control directly from your desktop
- No browser needed
- Native Windows/Mac/Linux app
- Integrated menu bar with common actions

⚡ **Fast & Lightweight**
- Instant launch
- Efficient resource usage
- Native system integration
- Full keyboard shortcuts support

🔒 **Secure**
- Context isolation enabled
- Node integration disabled
- Preload scripts for security

## Installation & Setup

### Requirements
- Node.js 14+ installed

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development:**
   ```bash
   npm run dev
   ```
   This will start the Electron app with hot-reload

### Build for Distribution

1. **Create production build:**
   ```bash
   npm run build
   ```
   This generates installers in the `dist/` folder for:
   - Windows (.exe installer)
   - macOS (.dmg)
   - Linux (.AppImage)

## Technologies Used

- **Electron** - Desktop application framework
- **Vite** - Fast build tool
- **Electron Builder** - Packaging and distribution

## Project Structure

```
kreo-offline-app/
├── electron/
│   ├── main.js         # Electron main process
│   └── preload.js      # Preload script for security
├── src/
│   ├── index.css       # App styles
│   ├── main.jsx        # React entry point (optional)
│   └── App.jsx         # React component (optional)
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Usage

### Development
```bash
npm run dev
```
Opens the Kreo Control website in an Electron window with DevTools enabled.

### Production
```bash
npm start
```
Launches the packaged app.

### Run Electron Directly
```bash
npm run electron
```

## Menu Options

- **File** → Exit (or Cmd/Ctrl+Q)
- **Edit** → Undo, Redo, Cut, Copy, Paste
- **View** → Reload, DevTools, Fullscreen, Zoom controls
- **Help** → About

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd/Ctrl+Q | Quit app |
| Cmd/Ctrl+R | Reload page |
| Cmd/Ctrl+Shift+I | Toggle DevTools |
| F11 | Fullscreen |
| Cmd/Ctrl++ | Zoom in |
| Cmd/Ctrl+- | Zoom out |
| Cmd/Ctrl+0 | Reset zoom |

## Customization

### Change Window Size
Edit `electron/main.js`:
```javascript
mainWindow = new BrowserWindow({
  width: 1200,    // Change width
  height: 800,    // Change height
})
```

### Change App Icon
Replace the icon at `assets/icon.png` with your own (512x512 PNG for best results)

### Modify App Title
Edit `electron/main.js`:
```javascript
mainWindow.setTitle('Your App Title')
```

## Troubleshooting

### App won't start
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check that port 3000 is not in use

### Electron not launching
- Run `npm run electron` directly to see error messages
- Check the console output for specific errors

### Website not loading
- Ensure you have internet connection (app loads from https://kontrol.kreo-tech.com)
- Check if the website is accessible in your browser

## License

MIT

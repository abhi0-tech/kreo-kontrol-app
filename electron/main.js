const { app, BrowserWindow, Menu, ipcMain, session } = require('electron')
const path = require('path')

let mainWindow

// Enable GPU - Electron 31 has better GPU compatibility
// app.disableHardwareAcceleration()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    icon: path.join(__dirname, '../icon.ico'),
    webPreferences: {
      sandbox: true,
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webHID: true,
      webUsb: true,
    },
  })

  mainWindow.loadURL('https://kontrol.kreo-tech.com/initialize')

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // DevTools disabled - use F12 to open if needed
    // mainWindow.webContents.openDevTools()
  })

  // Enable WebHID device access
  mainWindow.webContents.session.on('select-hid-device', (event, details, callback) => {
    console.log('[WebHID] Device selection requested, auto-selecting first device')
    if (details.deviceList && details.deviceList.length > 0) {
      callback(details.deviceList[0].deviceId)
    }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    console.log('✓ Page loaded - styles and buttons injected via preload')
  })

  // Close DevTools
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Clear all site data and create window on startup
app.on('ready', async () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Create application menu
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit()
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: () => {
          // You can create an about window here
        },
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)
// Hide the application menu bar
Menu.setApplicationMenu(null)

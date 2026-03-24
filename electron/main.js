const { app, BrowserWindow, Menu, ipcMain, session } = require('electron')
const path = require('path')

let mainWindow
let defaultDeviceId = null
let defaultDeviceName = null

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

  // Enable WebHID device access - auto-select if default device is stored
  mainWindow.webContents.session.on('select-hid-device', (event, details, callback) => {
    console.log('[WebHID] Device selection requested by app')
    console.log('[WebHID] Available devices:', details.deviceList.map(d => ({ 
      name: d.productName || 'Unknown', 
      id: d.deviceId,
      vendorId: '0x' + d.vendorId.toString(16),
      productId: '0x' + d.productId.toString(16)
    })))
    
    if (!details.deviceList || details.deviceList.length === 0) {
      console.log('[WebHID] No devices available')
      return
    }

    // If a default device is set, try to use it
    if (defaultDeviceId) {
      const defaultDevice = details.deviceList.find(d => d.deviceId === defaultDeviceId)
      if (defaultDevice) {
        console.log(`[WebHID] ✓ Auto-connecting to default device: ${defaultDevice.productName || 'Unknown'}`)
        callback(defaultDevice.deviceId)
        return
      } else {
        console.log(`[WebHID] Default device not found in current list, using first available`)
      }
    }

    // Otherwise use first available device
    const firstDevice = details.deviceList[0]
    console.log(`[WebHID] Connecting to first device: ${firstDevice.productName || 'Unknown'}`)
    callback(firstDevice.deviceId)
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

  // Register keyboard shortcuts for DevTools and Reload
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // F12 or Ctrl+Shift+I for DevTools
    if ((input.key.toLowerCase() === 'f12') ||
        (input.control && input.shift && input.key.toLowerCase() === 'i')) {
      mainWindow.webContents.toggleDevTools()
      event.preventDefault()
    }
    
    // Ctrl+R or Ctrl+Shift+R for reload
    if (input.control && (input.key.toLowerCase() === 'r')) {
      mainWindow.webContents.reload()
      event.preventDefault()
    }
  })
}

// IPC handlers for WebHID device management
ipcMain.handle('webhid:setDefaultDevice', (event, deviceId, deviceName) => {
  console.log('[WebHID] Setting default device:', deviceId, deviceName)
  defaultDeviceId = deviceId
  defaultDeviceName = deviceName
  return true
})

ipcMain.handle('webhid:getDefaultDevice', () => {
  return { id: defaultDeviceId, name: defaultDeviceName }
})

ipcMain.handle('webhid:clearDefaultDevice', () => {
  console.log('[WebHID] Clearing default device')
  defaultDeviceId = null
  defaultDeviceName = null
  return true
})

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

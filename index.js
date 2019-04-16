const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
let mainWindow = null

const iconPath = path.join(__dirname, '/resources/icon.png')

const option = {
  width: 800,
  height: 640,
  // x: json.mainWindowPosition ? json.mainWindowPosition.x : '',
  // y: json.mainWindowPosition ? json.mainWindowPosition.y : '',
  // resizable: false,
  icon: iconPath
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow(option)
  mainWindow.loadURL(path.join(__dirname, '/index.html'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.webContents.openDevTools()
})

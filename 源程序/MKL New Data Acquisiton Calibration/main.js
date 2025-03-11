const { app, BrowserWindow } = require('electron')

var { setWindow, showStatus } = require('./ipc_main.js')
const path = require('path')
var mainWindow = undefined;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    frame: false,
    resizable: false,
    maximizable: true,
    // fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, //允许远程模块使用
      // contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  mainWindow.setMenu(null);
  mainWindow.loadFile('ndac_home_Page.html')

}

app.whenReady().then(() => {
  createMainWindow(mainWindow)
  setWindow(mainWindow);
  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require("path");
const url = require("url");

let win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });

function createWindow(width, height) {
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: width,
    height: height
  });

  if (serve) {
    const reload = require('electron-reload');
    reload(__dirname, {
      electron: electron
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    createWindow(width, height);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

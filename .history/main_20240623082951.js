const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.setIgnoreMouseEvents(true);
}

app.whenReady().then(() => {
  createWindow();

  // Register global shortcut for Alt+Tab
  globalShortcut.register('Alt+Tab', () => {
    const win = BrowserWindow.getAllWindows()[0];
    win.webContents.send('alt-tab-pressed');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

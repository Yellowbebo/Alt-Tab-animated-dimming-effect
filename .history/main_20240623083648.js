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
  win.setIgnoreMouseEvents(true); // Ensure the window ignores mouse events to act as an overlay
}

app.whenReady().then(() => {
  createWindow();

  // Register global shortcut for H key
  globalShortcut.register('H', () => {
    console.log('H pressed');
    const win = BrowserWindow.getAllWindows()[0];
    win.webContents.send('h-key-pressed');
  });

  // Register global shortcut for Y key
  globalShortcut.register('Y', () => {
    console.log('Y pressed');
    const win = BrowserWindow.getAllWindows()[0];
    win.webContents.send('y-key-pressed');
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

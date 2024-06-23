const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // No window frame
    transparent: true, // Transparent window
    alwaysOnTop: true, // Always on top
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.setIgnoreMouseEvents(true); // Ignore mouse events for the overlay
}

app.whenReady().then(() => {
  createWindow();

  // Register global shortcuts for Alt+Tab
  globalShortcut.register('Alt+Tab', () => {
    const win = BrowserWindow.getAllWindows()[0];
    win.webContents.send('alt-tab-pressed');
  });

  globalShortcut.register('Alt', () => {
    const win = BrowserWindow.getAllWindows()[0];
    win.webContents.send('alt-released');
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

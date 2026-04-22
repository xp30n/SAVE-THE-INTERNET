const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 720,
        resizable: true,
        maximizable: false,
        dragable: true,
        fullscreenable: true,
        frame: false,
        backgroundColor: '#00000000',
        webPreferences: {
            contextIsolation: true
        }
    })

    win.loadFile('index.html');
    win.webContents.openDevTools();
    // win.setAlwaysOnTop(true);
}

app.whenReady().then(createWindow)
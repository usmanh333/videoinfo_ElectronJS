const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')
const {app, BrowserWindow, ipcMain} = electron

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({ webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false
    }});
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('file:send', (event, path)=>{
    console.log(path)
    ffmpeg.ffprobe(path, (err, metadata)=>{
        console.log('file length : ',metadata?.format.duration)
        mainWindow.webContents.send('file:length', metadata?.format.duration);
    })
});
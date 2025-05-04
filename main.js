const { app, BrowserWindow } = require("electron");

const createWin = () => {
    let win = new BrowserWindow({
        width: 1500,
        height: 800,
        maximizable: true,
        resizable: true,
        autoHideMenuBar: true,
        icon: "./public/images/logo.ico",
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.maximize();

    win.loadFile("./src/index.html");
    //win.webContents.openDevTools();
}

app.on("ready", () => {
    createWin();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWin();
    })
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
})

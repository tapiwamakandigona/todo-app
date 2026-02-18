const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 700,
    resizable: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
    titleBarStyle: "hiddenInset",
    backgroundColor: "#1a1a2e",
    icon: path.join(__dirname, "icon.png"),
  });

  // Load the built web app
  win.loadFile(path.join(__dirname, "dist", "index.html"));
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

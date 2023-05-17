const path = require("path");
const url = require("url");

const { app, BrowserWindow, protocol, dialog, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

const fs = require('fs');
// Global variable
var currData;

// // Conditionally include the dev tools installer to load React Dev Tools
// let installExtension, REACT_DEVELOPER_TOOLS; // NEW!

// if (isDev) {
//   const devTools = require("electron-devtools-installer");
//   installExtension = devTools.default;
//   REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
// } // NEW!

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
} // NEW!

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

/*
-------------------- IPC HANDLING -----------------------
*/
// Open file dialog
function handleFileOpen(e, message, win) {
  const dialogResult = dialog.showOpenDialog(win, {
    properties: ['openFile']
  })
  return dialogResult
  // console.log("hi")
  // const result = dialog.showOpenDialog({
  //   properties: ["openFile"],
  //   filters: [{ name: "Images", extensions: ["png","jpg","jpeg"] }]
  // });

  // result.then(({canceled, filePaths, bookmarks}) => {
  //   const base64 = fs.readFileSync(filePaths[0]).toString('base64');
  //   event.reply("chosenFile", base64);
  // });
  // return result
}

// Save file dialog
const ExcelExportData = 
    [{
      filename: 'img1.jpg', 
      majorgroup: 'Amphipoda', 
      individualcount: '2', 
      reviewed: '0'
    },
    {
      filename: 'img1.jpg', 
      majorgroup: 'Polychaeta', 
      individualcount: '3', 
      reviewed: '1'
    }]
function handleFileSave(e, win) {
  // console.log(projData)
  const dialogResult = dialog.showSaveDialog(win, {
    properties: ['openFile']
  })
  dialogResult.then(result => {
    console.log("RESULT: ", result)
    fs.writeFileSync(result.filePath, currData, 'utf-8');
  })
    return dialogResult
}

function handleDataSend(e, projData) {
  currData = projData
  console.log(currData)
}

async function handleAsyncMessage(event, arg) {
  console.log("Hi", arg)
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('async-message', handleAsyncMessage);
  ipcMain.handle('dialog:saveFile', handleFileSave);
  ipcMain.on('send-data', handleDataSend)
  
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  const win = createWindow();


  // if (isDev) {
  //   installExtension(REACT_DEVELOPER_TOOLS)
  //     .then(name => console.log(`Added Extension:  ${name}`))
  //     .catch(error => console.log(`An error occurred: , ${error}`));
  // }
}); // UPDATED!

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
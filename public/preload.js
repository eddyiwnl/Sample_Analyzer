// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
console.log("this is the preload script");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld('electronAPI', {
    ipcR: {
      myPing() {
        ipcRenderer.send('ipc-example', 'ping');
      },
      openFile: () => ipcRenderer.invoke('dialog:openFile'),
      saveFile: () => ipcRenderer.invoke('dialog:saveFile'),
      sendProjectData: (projData) => ipcRenderer.send('send-data', projData),
      asyncMessage: () => ipcRenderer.send('async-message'),
      callPythonFile: () => ipcRenderer.invoke('call-python-file'),
      once(channel, func) {
        const validChannels = ['ipc-example'];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
      },
      // on(channel) {
      //   const validChannels = ['dialog:openFile', 'OPEN_FILE_PATH'];
      //   if (validChannels.includes(channel)) {
      //     ipcRenderer.on(channel, (event, result) => {
      //       const src = `data:image/jpg;base64,${result}`
      //       return src;
      //     })
      //   }
      // }
    }
  })
});


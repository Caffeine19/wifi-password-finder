import { contextBridge, ipcRenderer } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
contextBridge.exposeInMainWorld('electronAPI', {
  getWifiPasswordList: () => ipcRenderer.invoke('getWifiPasswordList'),
  closeWindow: () => ipcRenderer.send('close'),
  fullscreenWindow: () => ipcRenderer.send('fullscreen'),
  minimizeWindow: () => ipcRenderer.send('minimize')
})

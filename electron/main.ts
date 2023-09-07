// electron截至到26版本，不支持ES module，只能使用commonjs
import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import { getWifiNameList, getWifiDetail } from './wifi'

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    },
    titleBarStyle: 'hidden'
  })

  const isDev = process.env.NODE_ENV?.trim() === 'development'
  if (isDev) {
    //开发环境下加载vite的预览页面
    const port = process.env.VITE_PORT?.trim()
    console.log('🚀 ~ file: main.js:19 ~ createWindow ~ port:', port)
    win.loadURL(`http://localhost:${port}/#/`)
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.handle('getWifiNameList', () => getWifiNameList())
  ipcMain.handle('getWifiDetail', (event, name) => getWifiDetail(name))

  ipcMain.on('minimize', () => {
    const win = BrowserWindow.getFocusedWindow()
    win.minimize()
  })
  ipcMain.on('fullscreen', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })
  ipcMain.on('close', () => {
    const win = BrowserWindow.getFocusedWindow()
    win.close()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

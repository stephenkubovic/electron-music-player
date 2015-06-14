import app from 'app'
import BrowserWindow from 'browser-window'
import ipc from 'ipc'
import dialog from 'dialog'
import {tags} from './lib/media'

export default () => {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('ready', () => {
    let mainWindow = new BrowserWindow({width: 1200, height: 800})
    let filepath = `${__dirname}/index.html`

    mainWindow.loadUrl(`file://${filepath}`)

    mainWindow.openDevTools()

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  })

  ipc.on('dialog', (e) => {
    dialog.showOpenDialog({properties: ['openDirectory']}, (filenames) => {
      if (!filenames || !filenames.length) return
      e.sender.send('directory', filenames[0])
    })
  })

  ipc.on('mediaInfo', (e, filepath) => {
    tags(filepath, (err, tags) => {
      if (!err) {
        e.sender.send('mediaInfo', tags)
      }
    })
  })
}

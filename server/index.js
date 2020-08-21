import { app, BrowserWindow } from 'electron';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @type {BrowserWindow}
 */
// eslint-disable-next-line import/no-mutable-exports
let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    show: false,
    title: 'Markdown',
    minHeight: '500px',
    minWidth: '800px',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    },
  });

  if (process.env.MODE === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Load file and load window when the file is parsed
  mainWindow.loadFile('dist/client/index.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
})();

export {
  mainWindow,
  app,
};

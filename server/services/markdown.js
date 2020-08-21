import path from 'path';

import { dialog, shell } from 'electron';
import R from 'ramda';

import { app } from '../index';

const fs = require('fs').promises;

export const readFile = async (file, encoding = 'utf8') => (await fs.readFile(file, encoding)).toString();

export const getMarkDownFile = async () => {
  const { filePaths: [file] } = await dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: path.resolve(__dirname, '../../../'),
    filters: [{ name: 'Markdown files', extensions: ['md', 'markdown'] }],
  });

  if (R.isNil(file)) return null;

  const content = await readFile(file);

  return { content, filePath: file };
};

export const saveFile = async (filePath, content) => {
  if (R.isNil(filePath)) {
    // eslint-disable-next-line no-param-reassign
    ({ filePath } = await dialog.showSaveDialog({
      defaultPath: app.getPath('documents'),
      filters: ['md', 'markdown'],
    }));

    if (R.isNil(filePath)) return false;
  }

  return fs.writeFile(filePath, content, { encoding: 'utf8' });
};

export const showFileInExplorer = (filePath) => {
  if (!R.isNil(filePath)) {
    shell.showItemInFolder(filePath);
  }
};

export const openFileInDefaultApp = (filePath) => {
  if (!R.isNil(filePath)) {
    return shell.openPath(filePath);
  }

  return Promise.reject();
};

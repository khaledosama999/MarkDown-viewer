import { SET_CURRENT_FILE, SET_FILE_PATH } from './constants';

export const setCurrentFileAction = (file) => ({ type: SET_CURRENT_FILE, file });
export const setFilePathAction = (filePath) => ({ type: SET_FILE_PATH, filePath });

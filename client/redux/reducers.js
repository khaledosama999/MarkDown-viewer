import { combineReducers } from 'redux';

import { isNil } from 'ramda';
import { SET_CURRENT_FILE, SET_FILE_PATH } from './constants';
import { getBaseName } from '../services/helpers';

const setCurrentFileReducer = (file = '', action) => {
  const { type } = action;

  switch (type) {
    case SET_CURRENT_FILE:
      return action.file;

    default:
      return file;
  }
};

const setFilePath = (filePath = null, action) => {
  switch (action.type) {
    case SET_FILE_PATH: {
      if (isNil(filePath)) { return 'MarkDown'; }
      const name = getBaseName(filePath);
      document.title = name;
      return action.filePath;
    }

    default: {
      if (isNil(filePath)) { return 'MarkDown'; }
      const name = getBaseName(filePath);
      document.title = name;
      return filePath;
    }
  }
};

const reducers = combineReducers({
  file: setCurrentFileReducer,
  filePath: setFilePath,
});

export default reducers;

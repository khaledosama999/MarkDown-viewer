import { takeEvery } from 'redux-saga/effects';
import { isNil } from 'ramda';
import { SET_FILE_PATH } from '../constants';
import { getBaseName } from '../../services/helpers';

function updateTitle(action) {
  if (isNil(action.filePath)) {
    document.title = 'MarkDown';
  } else {
    document.title = getBaseName(action.filePath);
  }
}

export function* takeEverySetFilePath() {
  yield takeEvery(SET_FILE_PATH, updateTitle);
}

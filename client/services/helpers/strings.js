import { isNil } from 'ramda';

/**
 *
 * @param {String} str
 *
 * @returns {String}
 */
export const getBaseName = (str) => {
  const baseNameRegex = /(\w+)(?:\.\w+)?$/i;

  const matches = str.match(baseNameRegex);

  if (!isNil(matches)) {
    return matches[1];
  }

  return null;
};

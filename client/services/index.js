import { remote } from 'electron';

/**
 * All services made available by the main process
 *
 * @namespace
 * @function {string} getMarkDownFile
 */
const services = remote.require('./services');

export default services;

import 'whatwg-fetch';
import 'babel-polyfill';
import firstScreen from './firstScreen';

const ES6Promise = require('es6-promise');

ES6Promise.polyfill();

firstScreen();

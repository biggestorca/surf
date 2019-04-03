import 'whatwg-fetch';
import registerServiceWorker from './registerServiceWorker';
import smoothScrollToAnchor from './smoothScrollToAnchor';
import headerDatetime from './headerDatetime';
import firstScreen from './firstScreen';
import surf from './surf';

const ES6Promise = require('es6-promise');

ES6Promise.polyfill();

const env = process.env.NODE_ENV;

if (env === 'production') {
  registerServiceWorker();
} else {
  console.log(`NODE_ENV is: '${env}', servise worker DISABLED.`);
}

smoothScrollToAnchor();
firstScreen();
headerDatetime();
surf();

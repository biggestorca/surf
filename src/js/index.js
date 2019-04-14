import 'whatwg-fetch';
import 'babel-polyfill';
import disablePreloader from './disablePreloader';
import registerServiceWorker from './registerServiceWorker';
import lazyImagesLoader from './lazyImages';
import smoothScrollToAnchor from './smoothScrollToAnchor';
import parameterBlock from './parameterBlock';
import headerDatetime from './headerDatetime';
import firstScreen from './firstScreen';
import surf from './surf';
import travel from './travel';
import sleep from './sleep';
import shop from './shop';
import footerDate from './footerDate';

const ES6Promise = require('es6-promise');

ES6Promise.polyfill();

const env = process.env.NODE_ENV;

lazyImagesLoader();

if (env === 'production') {
  registerServiceWorker();
} else {
  console.log(`NODE_ENV is: '${env}', servise worker DISABLED.`);
}

disablePreloader();
smoothScrollToAnchor();
parameterBlock();
firstScreen();
headerDatetime();
surf();
travel();
sleep();
shop();
footerDate();

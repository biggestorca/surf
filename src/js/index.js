import registerServiceWorker from './registerServiceWorker';
import smoothScrollToAnchor from './smoothScrollToAnchor';
import headerDatetime from './headerDatetime';
import firstScreen from './firstScreen';

const env = process.env.NODE_ENV;

if (env === 'production') {
  registerServiceWorker();
} else {
  console.log(`NODE_ENV is: '${env}', servise worker DISABLED.`);
}

smoothScrollToAnchor();
firstScreen();
headerDatetime();

import registerServiceWorker from './registerServiceWorker';
import navigatorStyling from './nav';

const env = process.env.NODE_ENV;

if (env === 'production') {
  registerServiceWorker();
} else {
  console.log(`NODE_ENV is: '${env}, servise worker DISABLED.`);
}

navigatorStyling();

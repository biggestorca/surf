import 'jquery';
import 'bootstrap';

import registerServiceWorker from './registerServiceWorker';
import navigatorStyling from './nav';

const env = process.env.NODE_ENV;

if (env === 'production') {
  registerServiceWorker();
}

navigatorStyling();

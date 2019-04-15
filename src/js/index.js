import disablePreloader from './disablePreloader';
import registerServiceWorker from './registerServiceWorker';
import lazyImagesLoader from './lazyImages';
import smoothScrollToAnchor from './smoothScrollToAnchor';
import parameterBlock from './parameterBlock';

import surf from './surf';
import travel from './travel';
import sleep from './sleep';
import shop from './shop';
import footerDate from './footerDate';

const env = process.env.NODE_ENV;

smoothScrollToAnchor();
surf();
parameterBlock();
travel();
sleep();
shop();
footerDate();

if (env === 'production') {
  registerServiceWorker();
} else {
  console.log(`NODE_ENV is: '${env}', servise worker DISABLED.`);
}
lazyImagesLoader();
disablePreloader();

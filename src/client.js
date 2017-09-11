import {
  CreateApp
} from './main.js';
require('./assets/css/reset.less');
require('./assets/css/common.less');
const {
  app
} = CreateApp();
app.$mount('#app');

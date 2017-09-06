import {
  CreateApp
} from './main.js';
require('./assets/css/reset.less');
const {
  app
} = CreateApp();
app.$mount('#app');

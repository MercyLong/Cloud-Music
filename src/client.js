import {
  CreateApp
} from './main.js';
require('swiper/dist/css/swiper.css');
require('./assets/css/reset.less');
require('./assets/css/common.less');
const {
  app
} = CreateApp();
app.$mount('#app');

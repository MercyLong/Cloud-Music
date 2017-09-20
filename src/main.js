// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from 'config/filter';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import {
  CreateStore
} from './store';
import FastClick from 'fastclick';
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
};
Vue.config.productionTip = false;
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.use(VueAwesomeSwiper);
/* eslint-disable no-new */
export function CreateApp() {
  const store = CreateStore();
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return {
    app,
    router,
    store
  };
};

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {
  CreateStore
} from './store';
Vue.config.productionTip = false;
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

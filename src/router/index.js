import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/home';
import Song from '@/views/song/song';
import Mv from '@/views/mv/mv';
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/song',
    name: 'SongPlayer',
    component: Song
  }, {
    path: '/mv',
    name: 'VideoPlayer',
    component: Mv
  }]
});

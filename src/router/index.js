import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/home';
import Song from '@/views/song/song';
import RecommendTab from '@/views/home/children/recommendTab';
import RankingTab from '@/views/home/children/rankingTab';
import SearchTab from '@/views/home/children/searchTab';
import Mv from '@/views/mv/mv';
import PlayList from '@/views/playlist/playlist';
Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'recommend' },
    children: [{
      path: '/recommend',
      name: 'recommend',
      component: RecommendTab
    }, {
      path: '/ranking',
      name: 'ranking',
      component: RankingTab
    }, {
      path: '/search',
      name: 'search',
      component: SearchTab
    }]
  }, {
    path: '/song',
    name: 'SongPlayer',
    component: Song
  }, {
    path: '/mv',
    name: 'VideoPlayer',
    component: Mv
  }, {
    path: '/playlist',
    name: 'PlayList',
    component: PlayList
  }]
});

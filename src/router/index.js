import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/home';
import Song from '@/views/song/song';
import RecommendTab from '@/views/home/children/recommendTab';
import RankingTab from '@/views/home/children/rankingTab';
import SearchTab from '@/views/home/children/searchTab';
import Mv from '@/views/mv/mv';
import PlayList from '@/views/playlist/playlist';
import Album from '@/views/album/album';
import RankList from '@/views/ranklist/ranklist';
import Topic from '@/views/topic/topic';
import Artists from '@/views/artists/artists';
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
  }, {
    path: '/ranklist',
    name: 'RankList',
    component: RankList
  }, {
    path: '/topic',
    name: 'Topic',
    component: Topic
  }, {
    path: '/album',
    name: 'Album',
    component: Album
  }, {
    path: '/artists',
    name: 'Artists',
    component: Artists
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  }
});

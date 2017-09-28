import Vue from 'vue';
import Router from 'vue-router';

const Home = r => require.ensure([], () => r(require('@/views/home/home')), 'home');
const Song = r => require.ensure([], () => r(require('@/views/song/song')), 'song');
const RecommendTab = r => require.ensure([], () => r(require('@/views/home/children/recommendTab')), 'recommendTab');
const RankingTab = r => require.ensure([], () => r(require('@/views/home/children/rankingTab')), 'rankingTab');
const SearchTab = r => require.ensure([], () => r(require('@/views/home/children/searchTab')), 'searchTab');
const PlayListTab = r => require.ensure([], () => r(require('@/views/home/children/playListTab')), 'playListTab');
const PlayListTabSelector = r => require.ensure([], () => r(require('@/views/home/children/playListTab/playListTabSelector')), 'playListTabSelector');
const Mv = r => require.ensure([], () => r(require('@/views/mv/mv')), 'mv');
const PlayList = r => require.ensure([], () => r(require('@/views/playlist/playlist')), 'playlist');
const Album = r => require.ensure([], () => r(require('@/views/album/album')), 'album');
const RankList = r => require.ensure([], () => r(require('@/views/ranklist/ranklist')), 'ranklist');
const Topic = r => require.ensure([], () => r(require('@/views/topic/topic')), 'topic');
const Artists = r => require.ensure([], () => r(require('@/views/artists/artists')), 'artists');
const ArtistsAlbum = r => require.ensure([], () => r(require('@/views/artists/children/artistsAlbum')), 'artistsAlbum');
const ArtistsHot = r => require.ensure([], () => r(require('@/views/artists/children/artistsHot')), 'artistsHot');
const ArtistsMv = r => require.ensure([], () => r(require('@/views/artists/children/artistsMv')), 'artistsMv');
const ArtistsDesc = r => require.ensure([], () => r(require('@/views/artists/children/artistsDesc')), 'artistsDesc');
const HighQualityList = r => require.ensure([], () => r(require('@/views/highQualityList/highQualityList')), 'highQualityList');
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
      },
      {
        path: '/playListTab',
        name: 'playListTab',
        component: PlayListTab
      }
    ]
  }, {
    path: '/playListSelector',
    name: 'selector',
    component: PlayListTabSelector
  }, {
    path: '/song',
    name: 'SongPlayer',
    component: Song
  }, {
    path: '/mv',
    name: 'VideoPlayer',
    component: Mv
  }, {
    path: '/highQualityList',
    name: 'highQualityList',
    component: HighQualityList
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
    component: Artists,
    redirect: { name: 'ArtistsHot' },
    children: [{
      path: 'hot',
      name: 'ArtistsHot',
      component: ArtistsHot
    }, {
      path: 'album',
      name: 'ArtistsAlbum',
      component: ArtistsAlbum
    }, {
      path: 'mv',
      name: 'ArtistsMv',
      component: ArtistsMv
    }, {
      path: 'desc',
      name: 'ArtistsDesc',
      component: ArtistsDesc
    }]
  }],
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from);
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

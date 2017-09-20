// 导出CreateStore方法,为以后服务器端渲染做准备
import Vue from 'vue';
import Vuex from 'vuex';
import SearchModule from './search_module';
import TabModule from './tab_module';
import AudioModule from './audio_module';
import SongModule from './song_module';
import PlayListModule from './playList_module';
import LRCModule from './lrc_module';
import RankListModule from './rankList_module';
import MVModule from './mv_module';
import AlbumModule from './album_module';
import ArtistsModule from './artists_module';

Vue.use(Vuex);
export function CreateStore() {
  return new Vuex.Store({
    modules: {
      search: SearchModule,
      tab: TabModule,
      audio: AudioModule,
      song: SongModule,
      playList: PlayListModule,
      LRC: LRCModule,
      rankList: RankListModule,
      mv: MVModule,
      album: AlbumModule,
      artist: ArtistsModule
    }
  });
};

<template>
  <div class="video-player-wrapper">
    <header-top></header-top>
    <div class="video-box">
      <div class="video-bg absolute-full">
        <video controls="" :src="currentVideoInfo.brs&&currentVideoInfo.brs['240']|addPrefix" class="video-player" :poster="currentVideoInfo.cover" id="video-player">
        </video>
        <span @click="playingVideo" v-if="isShowPlayIcon" class="player-icon absolute-full">
          <svg class="u-svg u-svg-playvd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138 138" data-reactid="9"><circle fill-opacity=".2" cx="69" cy="69" r="66" data-reactid="10"></circle><circle fill="none" stroke="#fff" stroke-width="3" stroke-opacity=".5" cx="69" cy="69" r="67.5" data-reactid="11"></circle><path fill="#fff" d="m53 44.954c0 0-.244-4.981 4.02-2.01l39.17 24.07c0 0 4.063 1.94 0 4.01l-39.17 24.07c0 0-3.848 2.848-3.936-1.563l-.083-48.579" data-reactid="12"></path></svg>
        </span>
      </div>
    </div>
    <mv-detail></mv-detail>
    <mv-recommends :mv-recommends="mvRecommends"></mv-recommends>
    <mv-comments :video-id="videoId"></mv-comments>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex';
import headerTop from 'common/header';
import mvDetail from './children/mvDetail';
import mvComments from './children/mvComments';
import mvRecommends from './children/mvRecommends';
import { fetchMvRecommends } from 'service';
export default {
  data() {
    return {
      videoId: this.$route.query.id,
      isShowPlayIcon: true,
      mvComments: {},
      mvRecommends: []
    };
  },
  components: {
    mvDetail,
    mvComments,
    mvRecommends,
    headerTop
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.id) {
        this.videoId = newVal.query.id;
      } else {

      }
    },
    videoId(newVal, oldVal) {
      this.initMvTemplate();
      this.isShowPlayIcon = true;
    }
  },
  computed: {
    ...mapGetters(['currentVideoInfo', 'audioElement'])
  },
  filters: {
    addPrefix(url) {
      if (url) {
        return `api/mv/url?url=${url}`;
      };
    }
  },
  methods: {
    ...mapMutations(['SET_PLAYING_STATUS']),
    async initVideoDetail() {
      this.$store.dispatch('fetchVideoDetailByAction', this.videoId);
    },
    controlControlBar(boolean) {
      document.getElementById('video-player').controls = boolean;
    },
    playingVideo() {
      this.controlControlBar(true);
      this.isShowPlayIcon = false;
      this.audioElement && this.audioElement.pause();
      this.SET_PLAYING_STATUS(false);
      document.getElementById('video-player').play();
    },
    async initMvRecommends() {
      let res = await fetchMvRecommends(this.videoId);
      if (res.code === 200) {
        this.mvRecommends = res.mvs;
      };
    },
    initMvTemplate() {
      this.initVideoDetail();
      this.initMvRecommends();
      this.controlControlBar(false);
    }
  },
  mounted() {
    this.initMvTemplate();
  }
};

</script>
<style lang="less" scoped>
.video-player-wrapper {
  .video-box {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    .player-icon {
      width: 46px;
      height: 46px;
      margin: auto;
    }
    .video-bg {
      background: #000;
      width: 100%;
      height: 100%;
      .video-player {
        height: 100%;
        width: 100%;
      }
    }
  }
}

</style>

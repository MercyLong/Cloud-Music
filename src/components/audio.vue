<template>
  <div class="global-audio-wrapper">
    <audio :src="songAudioUrl" @ended="audioPlayEnded" @timeupdate="audioUpdateTime" id="song-player-audio" autoplay="autoplay"></audio>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from 'vuex';
import { _setCurrentSongInLocal } from 'config/util';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['currentPlayLists', 'songAudioUrl', 'loopStatus', 'currentSongInfo', 'audioElement'])
  },
  methods: {
    ...mapMutations(['SET_AUDIO_TIME', 'SET_PLAYING_STATUS', 'SET_LRC_OFFSETHEIGHT']),
    audioUpdateTime() {
      if (this.audioElement) {
        let current = this.audioElement.currentTime;
        // 添加0.2秒触发条件到VUE渲染的时间
        current = (current + 0.2 < (this.currentSongInfo.dt / 1000)) ? current + 0.2 : current;
        this.SET_AUDIO_TIME(current);
        // 根据current找到当前所在的offset
      }
    },
    findNextSongIndex() {
      let idx;
      let songIndex;
      let len = this.currentPlayLists.length;
      this.currentPlayLists.forEach((item, index) => {
        if (item.id === parseInt(this.currentSongInfo.id)) {
          idx = index;
        };
      });
      switch (this.loopStatus) {
        // 列表循环
        case 0:
          songIndex = idx < (len - 1) ? idx + 1 : 0;
          break;
        case 1:
          songIndex = idx;
          break;
        case 2:
          songIndex = Math.floor(Math.random(0, len) * (len));
          break;
      };
      return songIndex;
    },
    audioPlayEnded() {
      let nextSongIndex = this.findNextSongIndex();
      this.gotoContinue(nextSongIndex);
      this.SET_PLAYING_STATUS(true);
    },
    gotoContinue(songIndex) {
      if (this.loopStatus === 1 || this.currentPlayLists.length === 1) {
        // 单曲循环，重新播放
        this.SET_LRC_OFFSETHEIGHT(0);
        this.audioElement.play();
      } else {
        let songInfo = this.currentPlayLists[songIndex];
        let songId = songInfo.id;
        this.$router.replace({
          path: 'song',
          query: {
            id: songId
          }
        });
        _setCurrentSongInLocal(songInfo);
      }
    }
  }
};

</script>
<style lang="less" scoped></style>

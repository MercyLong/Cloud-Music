<template>
  <div class="song-player-wrapper">
    <header-top></header-top>
    <div :style="{backgroundImage:`url(//music.163.com/api/img/blur/${songInfo.al&&(songInfo.al.pic_str||songInfo.al.pic)}?imageView&thumbnail=720x0&quality=75&tostatic=0)`}" class="song-player-bg">
    </div>
    <div class="song-player-info">
      <div class="song-player-disk-wrapper">
        <div class="song-player-disk">
          <div :style="{animationPlayState:isAnimated?'':'paused'}" class="song-player-disk-turn">
            <div class="song-player-img">
              <img :src="songInfo.al&&songInfo.al.picUrl">
            </div>
          </div>
        </div>
      </div>
      <div class="song-player-detail">
        <div class="song-player-artist">
          <span>{{songInfo.name}}</span>
          <span>-</span>
          <span class="author">{{songInfo.ar&&songInfo.ar[0].name}}</span>
        </div>
        <div class="lrc-info-wrapper">
          <div class="lrc-info-scroll">
            <div v-if="lrcInfo && lrcInfo.length > 0" :style="{transform:`translateY(-${offsetHeight}px)`}" class="inner-scroll-wrapper">
              <div :class="item.timeStamp <= audioCurrentTime &&(!lrcInfo[$index + 1]||( audioCurrentTime <= lrcInfo[$index + 1].timeStamp)) ?'active':''" v-for="(item ,$index) in lrcInfo" class="inner lrc-info-text">{{item.text}}
              </div>
            </div>
            <div v-else class="no-lrc">该歌曲暂无歌词</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <audio-control ref="audioControlElement" @RESET-LRC="changeLRC"></audio-control> -->
  </div>
</template>
<script type="text/javascript">
import { fetchSongLRC, fetchSongAudioUrl } from 'service';
import audioControl from './children/audioControl';
import headerTop from 'common/header';
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  created() {
    if (!this.songId) {
      this.$router.push('/');
    };
  },
  data() {
    return {
      songId: this.$route.query.id
    };
  },
  components: {
    audioControl,
    headerTop
  },
  watch: {
    audioCurrentTime(newVal, oldVal) {
      if (this.lrcInfo.length) {
        this.lrcInfo.forEach((item, idx) => {
          if ((item.timeStamp <= newVal) && (idx - 1 > 0)) {
            this.SET_LRC_OFFSET(idx - 1);
          }
        });
      };
    },
    offset(newVal, oldVal) {
      var elemLRC = document.querySelectorAll('.inner');
      if (elemLRC) {
        var currentHeight = elemLRC[newVal - 1].offsetHeight;
        this.SET_LRC_OFFSETHEIGHT(this.offsetHeight + currentHeight);
      }
    },
    songId(newVal, oldVal) {
      this.initSongContent();
    },
    $route(newVal, oldVal) {
      this.songId = newVal.query.id;
      this.SET_LRC_OFFSETHEIGHT(0);
    }
  },
  mixins: {

  },
  computed: {
    currentSongInfo() {
      return this.$store.getters.getCurrentSongInfo;
    },
    ...mapState(['isPlaying', 'loopStatus', 'currentSongId', 'currentPlayLists', 'audioCurrentTime', 'lrcInfo', 'audioElement', 'offset', 'offsetHeight']),
    songInfo() {
      return this.currentSongInfo;
    },
    isAnimated() {
      return this.isPlaying;
    }
  },
  methods: {
    ...mapActions(['fetchSongDetailByAction']),
    ...mapMutations(['SET_AUDIO_TIME', 'SET_PLAYING_STATUS', 'SET_CURRENT_SONG_ID', 'SET_AUDIO_URL', 'SET_LRC_INFO', 'SET_AUDIO_ELEMENT', 'SET_LRC_OFFSET', 'SET_LRC_OFFSETHEIGHT']),
    initSongContent() {
      this.initSongDetailInfo();
      // this.initSongLRCInfo();
      // this.initSongAudioUrl();
    },
    changeLRC(offset) {
      this.SET_LRC_OFFSETHEIGHT(offset);
    },
    initSongDetailInfo() {
      this.$store.dispatch('fetchSongDetailByAction', this.songId);
    },

    async initSongLRCInfo() {
      var res = await fetchSongLRC(this.songId);
      if (res.lrc && res.lrc.lyric) {
        // 正则匹配 空格替换成换行符。前面的时间全部替换掉
        var infoArray = res.lrc.lyric.split('\n');
        var pattern = /\[\d{2}:\d{2}.\d{0,}\]/g;
        // 最后一个元素是空元素，弹掉
        (infoArray[-1] === undefined) && infoArray.pop();
        infoArray = infoArray.map((item, idx) => {
          if (item.match(pattern)) {
            var timeString = item.match(pattern)[0];
            var timeArr = timeString.slice(1, -1).split(':');
            var timeStamp = parseInt(timeArr[0] * 60) + parseFloat(timeArr[1]);
            var lrcText = item.replace(pattern, '');
          }
          return { text: lrcText, timeStamp: timeStamp };
        }).filter((item, idx) => {
          return Boolean(item.text) === true;
        });
        this.SET_LRC_INFO(infoArray);
      } else {
        this.SET_LRC_INFO([]);
      }
    },
    async initSongAudioUrl() {
      var res = await fetchSongAudioUrl(this.songId);
      if (res.code === 200 && res.data[0].url) {
        this.SET_AUDIO_URL(res.data[0].url);
        this.SET_AUDIO_ELEMENT(document.getElementById('song-player-audio'));
      } else {
        // 当没有URL的时候的处理方式
      }
    }
  },
  mounted() {
    // 没有在后台运行,初始化
    console.log(this.songId);
    if ((this.songId) !== this.currentSongInfo.id) {
      this.initSongContent();
      this.SET_PLAYING_STATUS(true);
      this.SET_LRC_OFFSETHEIGHT(0);
    } else {
      this.$refs['audioControlElement'].resetLRC(this.audioCurrentTime);
    }
  }
};

</script>
<style lang="less" scoped>
.song-player-wrapper {
  height: 100%;
  min-width: 320px;
  position: relative;
  overflow: hidden;
  .song-player-info {
    .song-player-disk-wrapper {
      padding-top: 70px;
      .song-player-disk {
        position: relative;
        @media screen and (min-width: 360px) {
          width: 296px;
          height: 296px;
        }
        width: 248px;
        height: 248px;
        margin: 0 auto;
        &:after {
          @media screen and (min-width: 360px) {
            width: 96px;
            height: 137px;
            top: -70px;
            left: 133px;
            background-image: url(//s3.music.126.net/m/s/img/needle-ip6.png?be4ebbe…);
          }
          content: " ";
          position: absolute;
          top: -63px;
          left: 107px;
          z-index: 5;
          width: 84px;
          height: 122px;
          background: url(//s3.music.126.net/m/s/img/needle.png?702cf6d…) no-repeat;
          background-size: contain;
        }
        .song-player-disk-turn {
          animation: circleloop 32s linear infinite;
          position: relative;
          width: 100%;
          height: 100%;
          &:before,
          &:after {
            content: " ";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
          &:before {
            @media screen and (min-width: 360px) {
              background-image: url(//s3.music.126.net/m/s/img/disc-ip6.png?6979612…);
            }
            z-index: 2;
            background: url(//s3.music.126.net/m/s/img/disc.png?d3bdd10…) no-repeat;
            background-size: contain;
          }
          &:after {
            @media screen and (min-width: 360px) {
              background-image: url(//s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a…);
            }
            z-index: 3;
            background: url(//s3.music.126.net/m/s/img/disc_light.png?2bb24f3…) no-repeat;
            background-size: contain;
            -webkit-animation: circling 20s infinite linear;
            animation: circling 20s infinite linear;
          }
          .song-player-img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            @media screen and (min-width: 360px) {
              width: 184px;
              height: 184px;
            }
            width: 150px;
            height: 150px;
            border-radius: 50%;
          }
        }
      }
    }
    .song-player-detail {
      padding: 0 35px;
      margin-top: 25px;
      .song-player-artist {
        text-align: center;
        font-size: 18px;
        line-height: 1.1;
        color: #fefefe;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .author {
          font-size: 16px;
          color: hsla(0, 0%, 100%, .6);
        }
      }
      .lrc-info-wrapper {
        margin-top: 14px;
        .no-lrc {
          margin-top: 30px;
        }
        .lrc-info-scroll {
          line-height: 1.5;
          font-size: 16px;
          height: 88px;
          overflow: hidden;
          text-align: center;
          color: hsla(0, 0%, 100%, .6);
          .inner-scroll-wrapper {
            transition: transform .2s;
          }
          .lrc-info-text {
            padding-bottom: 8px;
            &.active {
              color: rgb(255, 255, 255);
            }
          }
        }
      }
    }
  }
  .song-player-bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
    opacity: 1;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-transform-origin: center top;
    transform-origin: center top;
    transition: opacity .3s linear;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      content: " ";
      background-color: rgba(0, 0, 0, .5);
    }
  }
}

</style>

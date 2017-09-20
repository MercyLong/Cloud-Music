<template>
  <div :style="{position:isFixed?'fixed':'absolute'}" class="header-top-wrapper">
    <i @click="$router.back(-1)" class="iconfont backTo">&#xe622;</i>
    <div class="header-title">{{title}}</div>
    <div v-if="hasPlayingStatus" @click="gotoCurrentSong" :class="isPlaying?'isPlaying':''" class="playing-status">
      <span class="first"></span>
      <span class="second"></span>
      <span class="thrid"></span>
      <span class="fourth"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
export default {
  props: ['title', 'hasPlayingStatus', 'isFixed'],
  computed: {
    ...mapGetters(['isPlaying', 'currentSongInfo'])
  },
  methods: {
    gotoCurrentSong() {
      // 优先查找Vuex里的数据
      let localCurrentSong = localStorage.getItem('currentSong');
      let id;
      if (localCurrentSong) {
        localCurrentSong = JSON.parse(localCurrentSong);
      };
      if (this.currentSongInfo.id) {
        id = this.currentSongInfo.id;
      } else if (localCurrentSong && localCurrentSong.id) {
        id = localCurrentSong.id;
      } else {
        return false;
      }
      this.$router.push({
        path: '/song',
        query: {
          id: id
        }
      });
    }
  }
};

</script>
<style lang="less">
.header-top-wrapper {
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  .header-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #fff;
  }
  .playing-status {
    flex: 1;
    text-align: right;
    margin-right: 15px;
    height: 19px;
    &.isPlaying {
      @keyframes loading {
        0%,
        100% {
          transform-origin: bottom;
          transform: scaleY(.3);
        }
        50% {
          transform-origin: bottom;
          transform: scaleY(1);
        }
      }
      span {
        animation: loading .6s ease infinite;
        &:nth-child(1) {
          -webkit-animation-delay: 0.2s;
        }
        &:nth-child(2) {
          -webkit-animation-delay: 0.4s;
        }
        &:nth-child(3) {
          -webkit-animation-delay: 0.6s;
        }
        &:nth-child(4) {
          -webkit-animation-delay: 0.8s;
        }
        &:nth-child(5) {
          -webkit-animation-delay: 0.8s;
        }
      }
    }
    span {
      display: inline-block;
      width: 2px;
      background: #fff;
      &.first {
        height: 15px;
      }
      &.thrid {
        height: 17px;
      }
      &.second {
        height: 11px;
      }
      &.fourth {
        height: 14px;
      }
      &.fifth {
        height: 12px;
      }
    }
  }
  .backTo {
    color: rgba(255, 255, 255, 0.7);
    margin-left: 10px;
    font-size: 24px;
  }
  .share {
    font-size: 24px;
    margin-right: 15px;
    color: rgba(255, 255, 255, 0.7);
  }
}

</style>

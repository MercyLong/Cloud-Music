<template>
  <div class="audio-control-wrapper">
    <div class="audio-progress-wrapper">
      <div class="start-time">{{parseInt(audioCurrentTime)|ComputedMinsAndSecond}}</div>
      <div id="progress-bar" @click="clickProgressBar($event)" class="progress-bar">
        <div class="ready"></div>
        <div :style="{width:readyWidth}" class="current">
          <span></span>
        </div>
      </div>
      <div class="end-time">{{parseInt(currentSongInfo.dt/1000)|ComputedMinsAndSecond}}</div>
    </div>
    <div class="audio-play-btn-wrapper">
      <div class="loop-status">
        <i @click="changeLoopStatus(loop)" v-show='loop.id == loopStatus' v-for="loop in loopInitData" v-html="loop.icon" class="iconfont"></i>
      </div>
      <div @click="clickButton('prev')" class="prev-btn">
        <i class="iconfont">&#xe603;</i>
      </div>
      <div @click="setPlayingStatus" :class="isPlaying?'pause':'play'" class="play-btn">
        <i v-if="!isPlaying" class="iconfont">&#xe60d;</i>
        <i v-if="isPlaying" class="iconfont">&#xe606;</i>
      </div>
      <div @click="clickButton('next')" class="next-btn">
        <i class="iconfont">&#xe617;</i>
      </div>
      <div class="song-list-status">
        <i @click="showSongLists" class="iconfont">&#xe61a;</i>
      </div>
    </div>
    <div :class="isShowListsPanel?'active':''" class="audio-song-list-panel">
      <div class="audio-current-mask"></div>
      <ul class="audio-current-list">
        <li :class="item.song.id == currentSongInfo.id?'active':''" class="audio-current-item border-bt" v-for="item in currentPlayLists">
          <div @click="gotoSongFromList(item.song.id)" class="item-name-wrapper">
            <i v-if="item.song.id == currentSongInfo.id" class="iconfont">&#xe671;</i>
            <span class="name">{{item.song.name}}</span>
            <span>-</span>
            <span class="artists">{{item.song.artists&&item.song.artists[0].name}}</span>
          </div>
          <i @click="removeFromList(item.song.id)" class="iconfont fork">&#xe612;</i>
        </li>
      </ul>
      <div @click="hideSongLists" class="close-btn border-tp">关闭</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from 'vuex';
import { _removeLocalHistoryForCurrent } from 'config/util';
export default {
  created() {
    let songListHistory = JSON.parse(localStorage.getItem('historyStack'));
    this.SET_CURRENT_PLAY_LIST(songListHistory);
  },
  methods: {
    ...mapMutations(['SET_PLAYING_STATUS', 'CHANGE_LOOP_STATUS', 'SET_CURRENT_PLAY_LIST', 'SET_AUDIO_TIME']),
    setPlayingStatus() {
      var audioElem = document.getElementById('song-player-audio');
      this.isPlaying ? audioElem.pause() : audioElem.play();
      this.SET_PLAYING_STATUS(!this.isPlaying);
    },
    changeLoopStatus(loop) {
      let id = loop.id < 2 ? loop.id + 1 : 0;
      this.CHANGE_LOOP_STATUS(id);
    },
    clickProgressBar(ev) {
      let elem = document.getElementById('progress-bar');
      let rect = elem.getBoundingClientRect();
      let leftMargin = rect.left;
      let pageX = ev.pageX - leftMargin;
      let elemWidth = rect.width;
      let percent = parseFloat(pageX / elemWidth);
      let duration = this.currentSongInfo.dt / 1000;
      let currentTime = parseInt(duration * percent);
      this.SET_AUDIO_TIME(currentTime);
      var audioElem = document.getElementById('song-player-audio');
      audioElem.currentTime = currentTime;
      this.resetLRC(currentTime);
    },
    resetLRC(currentTime) {
      let offsetHeight = 0;
      this.lrcInfo.forEach((item, idx) => {
        if ((item.timeStamp <= currentTime) && (idx - 2 > 0)) {
          let elemLRC = document.querySelectorAll('.inner');
          offsetHeight += elemLRC[idx - 2].offsetHeight;
        }
      });
      this.$emit('RESET-LRC', offsetHeight);
    },
    removeFromList(songId) {
      // 如果删除的是当前播放的音乐，跳到下一首
      let leftPlayLists = _removeLocalHistoryForCurrent('historyStack', songId);
      if (leftPlayLists.length) {
        if (songId === this.currentSongInfo.id) {
          this.clickButton('next');
          this.hideSongLists();
        };
        this.SET_CURRENT_PLAY_LIST(leftPlayLists);
      } else {
        this.$router.push({
          path: '/'
        });
      }
    },
    showSongLists() {
      this.isShowListsPanel = true;
    },
    hideSongLists() {
      this.isShowListsPanel = false;
    },
    clickButton(type) {
      let idx;
      let len = this.currentPlayLists.length;
      if (len === 1) {
        let elem = document.getElementById('song-player-audio');
        elem.play();
        this.SET_PLAYING_STATUS(true);
        return;
      }
      this.currentPlayLists.forEach((item, index) => {
        if (item.song.id === this.currentSongInfo.id) {
          idx = index;
        };
      });
      switch (this.loopStatus) {
        case 0:
        case 1:
          if (type === 'next') {
            idx = idx < (len - 1) ? idx + 1 : 0;
          } else {
            idx = idx > 0 ? idx - 1 : len - 1;
          }
          break;
        case 2:
          idx = Math.floor(Math.random() * len);
      };
      let songId = this.currentPlayLists[idx].song.id;
      this.gotoSong(songId);
      this.SET_PLAYING_STATUS(true);
    },
    gotoSongFromList(songId) {
      this.gotoSong(songId);
      this.hideSongLists();
      this.SET_PLAYING_STATUS(true);
    },
    gotoSong(songId) {
      this.$router.replace({
        path: 'song',
        query: {
          id: songId
        }
      });
    }
  },
  data() {
    return {
      isShowListsPanel: false
    };
  },
  computed: {
    ...mapState(['currentSongInfo', 'audioCurrentTime', 'isPlaying', 'loopInitData', 'loopStatus', 'currentPlayLists', 'lrcInfo']),
    readyWidth() {
      var currentTime = parseInt(this.audioCurrentTime);
      var totalTime = parseInt(this.currentSongInfo.dt / 1000);
      if (currentTime && totalTime) {
        return (currentTime / totalTime) * 100 + '%';
      }
    }
  }
};

</script>
<style lang="less" scoped>
.audio-control-wrapper {
  .audio-song-list-panel {
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    transform: translate(0, 100%);
    transition: transform .5s;
    &.active {
      transform: translate(0, 0);
    }
    .audio-current-mask {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 4;
      background: rgba(255, 255, 255, 0.5);
    }
    .close-btn {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .audio-current-list {
      overflow: scroll;
      max-height: 330px;
      padding-left: 10px;
      z-index: 5;
      .audio-current-item {
        display: flex;
        align-items: center;
        height: 40px;
        &:last-child {
          &:after {
            border: none;
          }
        }
        &.active {
          color: red;
          .artists {
            color: red !important;
          }
        }
        .fork {
          padding: 10px;
          margin-right: 5px;
          color: #999;
          font-size: 14px;
        }
        .item-name-wrapper {
          flex: 1;

          .iconfont {
            margin-right: 5px;
          }
          .name {
            font-size: 14px;
          }
          .artists {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
  .audio-play-btn-wrapper {
    display: flex;
    margin-top: 10px;
    @media screen and (min-width: 360px) {
      margin-top: 20px;
    }
    align-items: center;
    justify-content: center;
    div {
      text-align: center;
      flex: 1;
    }
    .play-btn {
      cursor: pointer;
      width: 45px;
      height: 49px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .iconfont {
      font-size: 45px;
      color: #e1e1e1;
    }
    .loop-status,
    .song-list-status {
      i {
        font-size: 25px;
      }
    }
    .prev-btn,
    .next-btn {
      i {
        font-size: 30px;
      }
    }
  }
  .audio-progress-wrapper {
    padding: 0 10px;
    color: #fefefe;
    margin-top: 20px;
    @media screen and (min-width: 360px) {
      margin-top: 40px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    .progress-bar {
      margin: 0 10px;
      height: 2px;
      width: 240px;
      padding: 10px 0;
      border-radius: 5px;
      position: relative;
      margin-bottom: 1px;
      .ready {
        background: #e1e1e1;
        width: 100%;
        position: absolute;
        height: 2px;
      }
      .current {
        position: absolute;
        height: 2px;
        background: red;
        span {
          position: absolute;
          right: 0;
          margin-top: 1px;
          transform: translate(50%, -50%);
          display: inline-block;
          width: 6px;
          height: 6px;
          border: 6px solid #fff;
          border-radius: 50%;
          background: red;
        } // &:after {
        //   transform: translate(5px, -7px);
        //   position: absolute;
        //   display: block;
        //   right: 0;
        //   width: 2px;
        //   height: 2px;
        //   border: 7px solid #fff;
        //   content: '';
        //   border-radius: 50%;
        //   background: transparent;
        // }
      }
    }
  }
}

</style>

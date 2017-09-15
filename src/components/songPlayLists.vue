<template>
  <div class="song-play-lists-wrapper">
    <ul class="song-play-lists">
      <li v-for="(item,$index) in songPlayLists" class="song-play-item">
        <div class="item-ranking">{{$index + 1}}</div>
        <div class="item-content-wrapper border-bt">
          <div @click="gotoSongFromPlayList(item)" class="item-name">
            <div class="artist-name first-line">{{item.name}}</div>
            <div class="artist-list first-line">
              <span v-for="(artist,index) in (item.ar||item.artists)">
            <span v-if="index > 0">/</span> {{artist.name}}
              </span>
              <span>-</span>
              <span>{{(item.al&&item.al.name)||item.name}}</span>
            </div>
          </div>
          <i @click="gotoMv(item.mv)" v-if="item.mv" class="iconfont mv">&#xe601;</i>
          <i class="iconfont operator">&#xe655;</i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { mapMutations } from 'vuex';
import { _setLocalHistoryForCurrent } from 'config/util';
export default {
  props: ['songPlayLists'],
  mounted() {

  },
  methods: {
    ...mapMutations(['SET_PLAY_LIST_TYPE', 'SET_CURRENT_PLAY_LIST']),
    gotoMv(mvId) {
      this.$router.push({
        path: '/mv',
        query: {
          id: mvId
        }
      });
    },
    gotoSongFromPlayList(item) {
      this.$router.push({
        path: '/song',
        query: {
          id: item.id
        }
      });
      console.log(item);
      _setLocalHistoryForCurrent('historyStack', item);
      this.SET_CURRENT_PLAY_LIST(this.songPlayLists);
      this.SET_PLAY_LIST_TYPE(true);
    }
  }
};

</script>
<style lang="less" scoped>
.song-play-lists-wrapper {
  .song-play-lists {
    .song-play-item {
      display: flex;
      align-items: center;
      .item-ranking {
        width: 40px;
        text-align: center;
        font-size: 17px;
        color: #999;
      }
      .item-content-wrapper {
        padding: 6px 0;
        flex: 1;
        display: flex;
        align-items: center;
        width: 0;
        height: 55px;
        box-sizing: border-box;
        .iconfont {
          font-size: 14px;
          color: #999;
          &.mv {
            margin-left: 5px;
            font-size: 24px;
          }
        }
      }
      .item-name {
        flex: 1;
        width: 0;
        .artist-list {
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
}

</style>

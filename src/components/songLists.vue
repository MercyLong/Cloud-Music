<template>
  <div class="new-song-list">
    <div @click="gotoSongPlayer(item.song.id,item)" :key="item.song.id" class="new-song-link" v-for="item in songLists">
      <div class="new-song-item border-bt">
        <div class="new-song-item-content">
          <div class="title">
            {{item.song.name}}
            <span v-if="item.song.alias && item.song.alias.length > 0">（{{item.song.alias[0]}}）</span>
          </div>
          <div class="tips">
            <i class="super-quality"></i>
            <!-- 歌手列表 -->
            <span v-for="(singer,index) in item.song.artists">
                <span v-if="index > 0">/ </span>{{singer.name}}
            </span>
            <!-- 曲风 -->
            <span> - {{item.song.album.name}}</span>
          </div>
        </div>
        <div class="icon-wrapper">
          <div class="new-song-item-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapMutations } from 'vuex';
import { _setLocalHistoryForCurrent, _setCurrentSongInLocal } from 'config/util';
export default {
  props: ['songLists'],
  methods: {
    ...mapMutations(['SET_PLAYING_STATUS', 'SET_PLAY_LIST_TYPE']),
    gotoSongPlayer(id, item) {
      this.$router.push({
        path: 'song',
        query: {
          id: id
        }
      });
      _setLocalHistoryForCurrent('historyStack', item);
      _setCurrentSongInLocal(item);
      // 设置成本地歌单
      this.SET_PLAY_LIST_TYPE(false);
    }
  }
};

</script>
<style lang="less" scoped>
.new-song-list {
  .new-song-link {
    display: flex;
    padding-left: 10px;
    align-items: center;
    .new-song-item {
      height: 55px;
      box-sizing: border-box;
    }
    .new-song-item-content {
      flex: 1;
      width: 0;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        font-size: 17px;
      }
      .super-quality {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880);
        background-repeat: no-repeat;
        background-size: 166px 97px;
      }
      .tips {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        font-size: 12px;
        color: #888;
      }
    }
    .icon-wrapper {
      display: flex;
      align-items: center;
      padding: 0 10px;
      .new-song-item-icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880);
        background-repeat: no-repeat;
        background-size: 166px 97px;
        background-position: -24px 0;
      }
    }
    .new-song-item {
      padding: 6px 0;
      flex: 1 1 auto;
      display: flex;
      position: relative;
    }
  }
}

</style>

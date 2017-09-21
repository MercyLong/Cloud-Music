<template>
  <div class="play-list-tab-content-wrapper">
    <div @click="gotoSelect" class="selector-wrapper">
      <div class="select-btn">{{playListClassifyType}}
        <i class="iconfont">&#xe604;</i>
      </div>
    </div>
    <div class="classify-list-wrapper">
      <ul v-load-more="{start:loadStart,cancel:loadCancel,end:loadEnd}" class="classify-list">
        <li @click="gotoPlayList(item)" v-for="item in playListClassifyInfo" class="classify-item">
          <div class="img-wrapper">
            <div class="play-count">
              <i class="iconfont">&#xe600;</i>
              <span>{{item.playCount|addMeasurement(4,'万')}}</span>
            </div>
            <img :src="getImageUrl(item.coverImgUrl,400,'webp')">
          </div>
          <div class="name-wrapper">
            {{item.name}}
          </div>
        </li>
      </ul>
      <pagination-load :is-loading="isLoading" :loadText="loadText"></pagination-load>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex';
import { getImageUrl, loadMore } from 'config/mixin';
import { setLocal } from 'config/util';
import loading from 'common/loading';
import paginationLoad from 'common/paginationLoad';
export default {
  data() {
    return {
      offset: 0,
      limit: 20,
      isLoading: false,
      loadText: ''
    };
  },
  components: {
    loading,
    paginationLoad
  },
  mixins: [getImageUrl, loadMore],
  computed: {
    ...mapGetters(['playListClassifyType', 'playListClassifyInfo'])
  },
  watch: {
    playListClassifyType(newVal, oldVal) {
      alert(newVal);
    }
  },
  mounted() {
    if (!this.playListClassifyInfo.length) {
      this.initClassifyPlayList();
    }
  },
  methods: {
    ...mapMutations(['SET_PLAY_LIST_CLASSIFY_INFO']),
    gotoSelect() {
      this.$router.push({
        name: 'selector'
      });
    },
    async fetchPlayListClassify() {
      let res = await this.$store.dispatch('fetchClassifyPlayListDataByAction', {
        offset: this.offset,
        limit: this.limit,
        cat: this.playListClassifyType
      });
      this.loadText = res.more ? '上拉加载' : '没有更多了';
      return res;
    },
    async loadEnd() {
      this.isLoading = true;
      this.offset += this.limit;
      let res = await this.fetchPlayListClassify();
      console.log(this.playListClassifyInfo);
      let newLists = [...this.playListClassifyInfo, ...res.playlists];
      console.log(newLists);
      this.SET_PLAY_LIST_CLASSIFY_INFO(newLists);
      this.isLoading = false;
    },
    gotoPlayList(item) {
      item.picUrl = item.coverImgUrl;
      setLocal('currentPlayListBaseInfo', item);
      // 2.跳转到歌单详情页
      this.$router.push({
        path: 'playlist',
        query: {
          id: item.id
        }
      });
    },
    async initClassifyPlayList() {
      let result = await this.fetchPlayListClassify();
      this.SET_PLAY_LIST_CLASSIFY_INFO(result.playlists);
    }
  }
};

</script>
<style lang="less" scoped>
.classify-list-wrapper {
  .classify-list {
    overflow: hidden;
    .classify-item {
      width: 50%;
      box-sizing: border-box;
      float: left;
      &:nth-child(2n+1) {
        padding-right: 2px;
      }
      &:nth-child(2n) {
        padding-left: 2px;
      }
      .name-wrapper {
        margin-bottom: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 6px 2px 0 6px;
        line-height: 1.2;
        font-size: 13px;
        height: 36px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .img-wrapper {
        padding-bottom: 100%;
        position: relative;
        img {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          right: 0;
        }
        .play-count {
          z-index: 2;
          left: 0;
          text-align: right;
          position: absolute;
          top: 0;
          right: 5px;
          color: #fff;
          line-height: 20px;
          font-sie: 14px;
          span {
            display: inline-block;
          }
          .iconfont {
            font-size: 10px;
          }
        }
      }
    }
  }
}

.selector-wrapper {
  height: 60px;
  display: flex;
  align-items: center;
  .select-btn {
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-radius: 16px;
    border: 1px solid #e1e1e1;
    font-size: 14px;
    color: #888;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
    .iconfont {
      font-size: 22px;
      color: #888;
    }
  }
}

</style>

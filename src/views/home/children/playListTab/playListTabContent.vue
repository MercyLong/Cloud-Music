<template>
  <div>
    <div v-if="!isShowSelector" class="play-list-tab-content-wrapper">
      <div class="selector-wrapper">
        <div @click="gotoSelect" class="select-btn">{{playListClassifyType}}
          <i class="iconfont">&#xe604;</i>
        </div>
        <div class="hot-tags">
          <span>华语</span>
          <span class="border-lt border-rt">轻音乐</span>
          <span>摇滚</span>
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
        <pagination-load :is-loading="isLoading" :loadText="loadText">
        </pagination-load>
      </div>
    </div>
    <transition name="bounce-slider" mode="out-in">
      <div class="play-list-selector-container" v-if="isShowSelector">
        <div class="selector-header">
          <div @click="hideSelector" class="header">取消</div>
          <div class="body">筛选歌单</div>
          <div class="footer"></div>
        </div>
        <play-list-tab-selector :play-List-classify-type="playListClassifyType" :all="all" :sub-lists="subLists" @selectype="selectPlayType"></play-list-tab-selector>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import { mapMutations, mapGetters } from 'vuex';
import { getImageUrl, loadMore } from 'config/mixin';
import { setLocal } from 'config/util';
import loading from 'common/loading';
import { fetchClassifyPlayListData, fetchClassifyPlayListCat } from 'service';
import paginationLoad from 'common/paginationLoad';
import playListTabSelector from './playListTabSelector';
export default {
  data() {
    return {
      offset: 0,
      limit: 20,
      isLoading: false,
      loadText: '',
      preventRepeatRequest: true,
      hasMore: null,
      isShowSelector: false,
      all: {},
      subLists: []
    };
  },
  components: {
    loading,
    paginationLoad,
    playListTabSelector
  },
  mixins: [getImageUrl, loadMore],
  mounted() {
    // 本地没有的时候初始化
    if (!this.playListClassifyInfo.length) {
      this.initClassifyPlayList();
    };
    this.initClassPlayListTags();
  },
  watch: {
    playListClassifyType(newVal, oldVal) {
      this.initClassifyPlayList();
      document.body.scrollTop = 0;
    }
  },
  computed: {
    ...mapGetters(['playListClassifyInfo', 'playListClassifyType'])
  },
  methods: {
    ...mapMutations(['SET_PLAY_LIST_CLASSIFY_INFO']),
    gotoSelect() {
      this.isShowSelector = true;
    },
    selectPlayType(item) {
      this.hideSelector();
    },
    async initClassPlayListTags() {
      let result = await fetchClassifyPlayListCat();
      this.subLists = this.dataProcess(result);
      this.all = Object.assign({}, result.all);
    },
    dataProcess(res) {
      let ret = [];
      let cate = res.categories;
      let subList = res.sub;
      Object.keys(cate).forEach((key) => {
        ret[key] = {};
        ret[key]['toplist'] = subList.filter((val, idx) => {
          return val.category === parseInt(key);
        });
        ret[key]['name'] = cate[key];
        if (ret[key]['toplist'].length > 6) {
          ret[key]['more'] = true;
          ret[key]['morelist'] = ret[key]['toplist'].splice(0, 6);
        } else {
          ret[key]['morelist'] = [...ret[key]['toplist']];
        }
      });
      return ret;
    },
    async fetchPlayListClassify() {
      let res = await this.$store.dispatch('fetchClassifyPlayListDataByAction', {
        offset: this.offset,
        limit: this.limit,
        cat: this.playListClassifyType
      });
      this.hasMore = res.more;
      this.loadText = res.more ? '上拉加载' : '没有更多了';
      return res;
    },
    hideSelector() {
      this.isShowSelector = false;
    },
    loadEnd() {
      if (!this.preventRepeatRequest) {
        return;
      };
      this.preventRepeatRequest = false;
      this.isLoading = true;
      this.offset += this.limit;
      fetchClassifyPlayListData({
        offset: this.offset,
        limit: this.limit,
        cat: this.playListClassifyType
      }).then(res => {
        this.SET_PLAY_LIST_CLASSIFY_INFO(this.playListClassifyInfo.concat(res.playlists));
        setTimeout(() => {
          this.preventRepeatRequest = true;
        }, 1000);
      });
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
    initClassifyPlayList() {
      fetchClassifyPlayListData({
        offset: this.offset,
        limit: this.limit,
        cat: this.playListClassifyType
      }).then(res => {
        this.SET_PLAY_LIST_CLASSIFY_INFO([...res.playlists]);
        this.loadText = res.more ? '上拉加载' : '没有更多了';
      });
    }
  }
};

</script>
<style lang="less" scoped>
.bounce-slider-enter-active,
.bounce-slider-leave-active {
  transition: all .2s;
}

.bounce-slider-enter,
.bounce-slider-leave-active {
  transform: translate3d(0, 100%, 0);
}

.play-list-selector-container {
  position: absolute;
  z-index: 999;
  top: 0;
  .selector-header {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #fff;
    background: #d43c33;
    .header,
    .footer {
      margin-left: 10px;
      line-height: 64px;
      width: 80px;
      height: 100%;
    }
    .body {
      text-align: center;
      flex: 1;
    }
  }
}

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
    color: #333;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
    .iconfont {
      font-size: 22px;
      color: #888;
    }
  }
  .hot-tags {
    line-height: 1;
    flex: 1;
    text-align: right;
    padding-right: 10px;
    font-size: 13px;
    color: #999;
    span {
      display: inline-block;
      padding: 0 5px;
    }
  }
}

</style>

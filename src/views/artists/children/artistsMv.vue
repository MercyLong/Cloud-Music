<template>
  <div v-load-more="{start:loadStart,cancel:loadCancel,end:loadEnd}" class="artists-mv-wrapper">
    <ul class="artists-mv-list">
      <li @click="gotoMv(item)" v-for="item in currentMvInfo.mvs" class="artists-mv-item">
        <div class="mv-img-wrapper">
          <img :src="getImageUrl(item.imgurl,198,'webp')">
          <div class="mv-camera">
            <i class="iconfont">&#xe756;</i>
            <span>{{item.playCount|addMeasurement(4,'万')}}</span>
          </div>
        </div>
        <div class="mv-name-wrapper border-bt">
          <div class="mv-name f-hide">{{item.name}}</div>
          <div class="mv-pubilsh">{{item.publishTime}}</div>
        </div>
      </li>
    </ul>
    <div class="common-page-footer-wrapper">
      <div v-if="!isLoading" class="">{{loadText}}</div>
      <div v-else class="">
        <loading></loading>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchArtistMv } from 'service';
import loading from 'common/loading';
import { loadMore, getImageUrl } from 'config/mixin';
export default {
  data() {
    return {
      id: this.$route.query.id,
      offset: 0,
      limit: 20,
      currentMvInfo: {},
      loadText: '',
      isLoading: false,
      hasMore: false
    };
  },
  components: {
    loading
  },
  mixins: [loadMore, getImageUrl],
  methods: {
    async initArtistMv() {
      let result = await this.fetchMvData();
      this.currentMvInfo = Object.assign({}, result);
    },
    async fetchMvData() {
      let res = await fetchArtistMv({
        id: this.id,
        offset: this.offset,
        limit: this.limit
      });
      this.hasMore = res.hasMore;
      this.loadText = this.hasMore ? '上拉加载' : '没有更多了';
      return res;
    },
    gotoMv(mvInfo) {
      this.$router.push({
        path: '/mv',
        query: {
          id: mvInfo.id
        }
      });
    },
    async loadEnd() {
      this.offset += this.limit;
      this.isLoading = true;
      let result = await this.fetchMvData();
      this.currentMvInfo.mvs = [...this.currentMvInfo.mvs, ...result.mvs];
      this.isLoading = false;
    }
  },
  mounted() {
    this.initArtistMv();
  }
};

</script>
<style lang="less" scoped>
.artists-mv-wrapper {
  padding-left: 10px;
  .artists-mv-list {
    .artists-mv-item {
      height: 60px;
      display: flex;
      align-items: center;
      .mv-img-wrapper {
        width: 89px;
        height: 50px;
        position: relative;
        z-index: 3;
        .mv-camera {
          width: 100%;
          color: #fff;
          right: 0;
          text-align: right;
          top: 0;
          position: absolute;
          font-size: 12px;
          z-index: 2;
          margin-right: 5px;
          .iconfont {
            font-size: 14px;
          }
        }
        &:after {
          z-index: 1;
          position: absolute;
          content: '';
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .mv-name-wrapper {
        margin-left: 10px;
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        width: 0;
        position: relative;

        .mv-pubilsh {
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
}

</style>

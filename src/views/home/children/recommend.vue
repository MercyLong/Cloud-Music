<template>
  <div class="recommend-wrapper">
    <div class="recommend">
      <h2 class="recommend-title">推荐歌单</h2>
      <div class="recommend-list">
        <a class="recommend-item" v-for="item in recommendList">
          <div class="recommend-item-img">
            <img :src="item.picUrl">
          </div>
          <div class="recommend-item-text">{{item.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchRecommendList } from 'service';
export default {
  methods: {
    async initRecommendList() {
      var res = await fetchRecommendList() || {};
      this.recommendList = res.result;
    }
  },
  data() {
    return {
      recommendList: []
    };
  },
  mounted() {
    this.initRecommendList();
  }
};

</script>
<style lang="less">
.recommend-wrapper {
  padding-top: 20px;
  .recommend {
    .recommend-title {
      font-weight: 400;
      position: relative;
      padding-left: 9px;
      margin-bottom: 14px;
      font-size: 17px;
      height: 20px;
      line-height: 20px;
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -9px;
        width: 2px;
        height: 16px;
        background-color: #d33a31;
      }
    }
    .recommend-list {
      margin-bottom: 24px;
      overflow: hidden;
      .recommend-item {
        display: block;
        float: left;
        width: 33.3%;
        box-sizing: border-box;
        padding: 0 1px;
        margin-bottom: 16px;
        &:nth-child(3n) {
          width: 33.4%;
          padding-left: 2px;
          padding-right: 0;
        }
        &:nth-child(3n+1) {
          padding-left: 0px;
          padding-right: 2px;
        }
        .recommend-item-text {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding: 6px 2px 0 6px;
          line-height: 1.2;
          font-size: 13px;
          height: 36px;
          box-sizing: border-box;
        }
      }
    }
  }
}

</style>

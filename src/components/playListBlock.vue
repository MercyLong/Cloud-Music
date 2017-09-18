<template>
  <div class="recommend-list">
    <div @click="gotoPlayListDetail(item)" :key="item.id" :to="{path:'playlist',query:{id:item.id}}" class="recommend-item" v-for="item in recommendList">
      <div :class="item.playCount?'mask':''" class="recommend-item-img">
        <img @load="needReload?completeLoad(item):()=>{}" :src="`${item.picUrl}`">
        <span v-if="item.playCount" class="recommend-like-num">
            <i class="iconfont">&#xe600;</i>
            {{item.playCount| addMeasurement(4,'万')}}</span>
      </div>
      <div class="recommend-item-text">{{item.name}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { replaceImageUrl } from 'config/mixin';
// 歌单跳转的时候进行本地缓存。再下一个落地页提取
import { setLocal } from 'config/util';
export default {
  mixins: {
    replaceImageUrl
  },
  mounted() {
    console.log(this.recommendList);
  },
  props: ['recommendList', 'needReload'],
  methods: {
    completeLoad(item) {
      item.picTinyUrl = replaceImageUrl.changeImageType((item.picUrl), 'webp');
    },
    gotoPlayListDetail(item) {
      // 1.设置本地缓存,基本信息不需要http
      setLocal('currentPlayListBaseInfo', item);
      // 2.跳转到歌单详情页
      this.$router.push({
        path: 'playlist',
        query: {
          id: item.id
        }
      });
    }
  }
};

</script>
<style lang="less" scoped>
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
    .recommend-item-img {
      position: relative;
      &.mask {
        &:after {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 20px;
          z-index: 2;
          background-image: linear-gradient(180deg, rgba(0, 0, 0, .5), transparent);
        }
      }

      .recommend-like-num {
        z-index: 3;
        position: absolute;
        top: 0;
        right: 5px;
        color: #fff;
        text-align: right;
        line-height: 20px;
        font-size: 14px;
        .iconfont {
          font-size: 10px;
        }
      }
    }
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

</style>

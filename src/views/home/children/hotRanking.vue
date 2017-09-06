<template>
  <div class="hot-ranking-wrapper">
    <list-view :list-idx="3"></list-view>
    <list-view :list-idx="0"></list-view>
    <list-view :list-idx="2"></list-view>
    <list-view :list-idx="1"></list-view>
  </div>
</template>
<script type="text/javascript">
import songLists from './songLists';
import listView from './listView';
export default {
  components: {
    songLists,
    listView
  },
  methods: {
    async initHotRankingList() {}
  },
  mounted() {
    this.initHotRankingList();
  }
};

</script>
<style lang="less">
.hot-ranking-wrapper {
  .hot-ranking-cover {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
    background: url(//s3.music.126.net/m/s/img/hot_music_bg_2x.jpg?f01a252…) no-repeat;
    background-size: contain;
    .hot-ranking-cover-conetnt {
      top: 20px;
      position: absolute;
      z-index: 2;
      padding-left: 20px;
      box-sizing: border-box;
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
    .hot-ranking-icon {
      &.icon {
        width: 142px;
        height: 67px;
        background-position: -24px -30px;
      }

      background: url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28…) no-repeat;
      background-size: 166px 97px;
    }
    .update-time {
      margin-top: 10px;
      color: hsla(0, 0%, 100%, .8);
      font-size: 12px;
      -webkit-transform: scale(.91);
      transform: scale(.91);
      -webkit-transform-origin: left top;
      transform-origin: left top;
    }
  }
}

</style>

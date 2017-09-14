<template>
  <div class="recommend-wrapper">
    <div class="recommend">
      <h2 class="recommend-title">推荐歌单</h2>
      <play-list-block :need-reload="true" :recommend-list="recommendList"></play-list-block>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchRecommendList } from 'service';
import { replaceImageUrl } from 'config/mixin';
import playListBlock from 'common/playListBlock';
export default {
  methods: {
    async initRecommendList() {
      var res = await fetchRecommendList() || {};
      this.recommendList = this.dataProcess(res.result);
    },
    dataProcess(list) {
      list.map((item, idx) => {
        item.picTinyUrl = replaceImageUrl.tinyImageUrl(item.picUrl, 40);
        return item;
      });
      return list;
    }

  },
  components: {
    playListBlock
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
  }
}

</style>

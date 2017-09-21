<template>
  <div class="artists-desc-wrapper">
    <div class="common-title">简介</div>
    <div class="artists-desc">
      {{descInfo.briefDesc}}
    </div>
    <div class="common-title">相关专栏文章</div>
    <topic-list :top-list="descInfo.topicData"></topic-list>
    <div class="total-topic">全部专栏文章
      <span>（6）</span>
      <i class="iconfont">&#xe604;</i>
    </div>
  </div>
</template>
<script type="text/javascript">
import { fetchArtistDesc } from 'service';
import topicList from 'common/topicList';
export default {
  data() {
    return {
      id: this.$route.query.id,
      descInfo: {}
    };
  },
  components: { topicList },
  methods: {
    async initArtistDesc() {
      let res = await fetchArtistDesc(this.id);
      this.descInfo = Object.assign({}, res);
    }
  },
  mounted() {
    this.initArtistDesc();
  }
};

</script>
<style lang="less" scoped>
.artists-desc-wrapper {
  .common-title {
    margin: 10px 0 4px 0;
    font-size: 14px;
  }
}

.total-topic {
  display: flex;
  align-items: center;
  justify-content: center;
  .iconfont {
    color: #999;
    margin-left: -5px;
    font-size: 24px;
  }
  span {
    margin-left: -5px;
  }
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  color: #888;
}

.artists-desc {
  font-size: 14px;
  line-height: 24px;
  color: #666;
  padding: 0 10px;
}

</style>

<template>
  <div>
    <div :style="{backgroundImage:`url(${currentRankInfo.coverImgUrl})`}" class="rank-list-wrapper">
      <div class="rank-list-header">
        <header-top :has-playing-status="true" :title="'排行榜'"></header-top>
      </div>
      <div class="rank-list-body"></div>
      <div class="rank-list-footer">
        <div class="btn-gourp add">
          <i class="iconfont add">&#xe615;</i>
          <p>{{currentRankInfo.subscribedCount|addMeasurement(4,'万')}}</p>
        </div>
        <div class="btn-gourp comment">
          <i class="iconfont add">&#xe625;</i>
          <p>{{currentRankInfo.commentCount|addMeasurement(4,'万')}}</p>
        </div>
        <div class="btn-gourp">
          <i class="iconfont">&#xe64f;</i>
          <p>{{currentRankInfo.shareCount|addMeasurement(4,'万')}}</p>
        </div>
        <div class="btn-gourp">
          <i class="iconfont">&#xe60a;</i>
          <p>下载</p>
        </div>
      </div>
    </div>
    <div class="rank-list-body">
      <song-play-lists :song-play-lists="currentRankInfo.tracks"></song-play-lists>
    </div>
  </div>
</template>
<script type="text/javascript">
import headerTop from 'common/header';
import songPlayLists from 'common/songPlayLists';
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  created() {
    this.rid = this.$route.query.id;
  },
  computed: {
    ...mapState(['currentRankInfo', ''])
  },
  methods: {
    ...mapActions(['fetchPlayListDetailByAction']),
    ...mapMutations(['SET_CURRENT_PLAY_LIST_DETAIL', 'SET_CURRENT_RANK_LIST_INFO']),
    async initRankList() {
      var res = await this.fetchPlayListDetailByAction(this.rid);
      this.SET_CURRENT_RANK_LIST_INFO(res);
    }
  },
  mounted() {
    // 如果已经存在直接取。如果是当前用户刷新需要重新请求
    if (this.currentRankInfo && this.currentRankInfo.tracks) {
      this.SET_CURRENT_PLAY_LIST_DETAIL(this.currentRankInfo);
    } else {
      this.initRankList();
    }
  },
  components: {
    headerTop,
    songPlayLists
  }
};

</script>
<style lang="less" scoped>
.rank-list-wrapper {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .rank-list-header {
    height: 64px;
  }
  .rank-list-body {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
  }
  .rank-list-footer {
    text-align: center;
    display: flex;
    color: #fff;
    div {
      flex: 1;
    }
    p {
      line-height: 18px;
      font-size: 14px;
      margin: 10px 0;
    }
    .iconfont {
      font-size: 20px;
    }
  }
}

</style>

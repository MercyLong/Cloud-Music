<template>
  <div class="mv-comments-wrapper">
    <!-- Hot comments -->
    <div v-if="mvComments.hotComments&&mvComments.hotComments.length > 0" class="mv-hot-comments-wrapper">
      <div class="mv-hot-comments-title">精彩评论</div>
      <comment-lists :comment-lists="mvComments.hotComments"></comment-lists>
    </div>
    <!-- Common comments -->
    <div v-load-more="{start:loadStart,cancel:loadCancel,end:loadMore}" v-if="mvComments.comments && mvComments.comments.length > 0" class="mv-comments-wrapper">
      <div class="mv-hot-comments-title">最新评论
        <span class="comments-total">（{{mvComments.total}}）</span></div>
      <comment-lists :comment-lists="mvComments.comments"></comment-lists>
      <div class="load-more">{{loadMoreText}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import commentLists from 'common/commentLists';
import { loadMore } from 'config/mixin';
import { fetchMvComments } from 'service';
export default {
  props: ['videoId'],
  mounted() {
    this.initMvComments();
  },
  data() {
    return {
      loadMoreText: '上拉加载',
      offset: 0,
      mvComments: {}
    };
  },
  watch: {
    videoId(newVal, oldVal) {
      this.offset = 0;
      this.initMvComments();
    }
  },
  methods: {
    async initMvComments() {
      let res = await fetchMvComments(this.videoId, this.offset);
      if (res.code === 200) {
        this.mvComments = res;
      };
    },
    async loadMore() {
      this.loadMoreText = '加载中...';
      this.offset += 20;
      let res = await fetchMvComments(this.videoId, this.offset);
      if (res.code === 200) {
        this.mvComments.comments = [...this.mvComments.comments, ...res.comments];
        this.loadMoreText = res.more ? '上拉加载' : '没有更多了';
      };
    },
    loadStart() {
      this.loadMoreText = '松开刷新';
    },
    loadCancel() {
      this.loadMoreText = '上拉加载';
    }
  },
  mixins: [loadMore],
  components: {
    commentLists
  }
};

</script>
<style lang="less" scoped>
.mv-hot-comments-wrapper,
.mv-comments-wrapper {
  .comments-total {
    margin-left: -12px;
  }
  .load-more {
    color: #888;
    margin: 10px 0;
    text-align: center;
  }
  .mv-hot-comments-title {
    font-weight: 400;
    position: relative;
    padding-left: 9px;
    margin-top: 10px;
    margin-bottom: 4px;
    font-size: 14px;
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

</style>

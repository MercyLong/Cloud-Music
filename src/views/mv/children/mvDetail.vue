<template>
  <section class="video-detail-wrapper border-tp ">
    <div class="video-type-name">
      <span class="mv-name">{{currentVideoInfo.name}}</span>
    </div>
    <div class="video-artists">
      <span>歌手：</span>
      <span>{{currentVideoInfo.artistName}}</span>
    </div>
    <div class="video-play-number">
      <div class="publish-time border-rt">
        <span>发布时间：</span>
        <span>{{currentVideoInfo.publishTime}}</span>
      </div>
      <div class="play-number">
        <span>播放：</span>
        <span>1607.9万</span>
      </div>
    </div>
    <transition>
      <div v-if=" currentVideoInfo.desc" class="video-desc">{{currentVideoInfo.desc}}</div>
    </transition>
  </section>
</template>
<script type="text/javascript">
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['currentVideoInfo'])
  },
  data() {
    return {

    };
  },
  methods: {}
};

</script>
<style lang="less" scoped>
.video-detail-wrapper {
  padding: 15px 10px 12px;
  .video-desc {
    margin: 0;
    padding-top: 8px;
    color: #666;
    font-size: 13px;
    line-height: 20px;
  }
  .video-play-number {
    display: flex;
    margin-top: 8px;
    font-size: 13px;
    line-height: 15px;
    color: #999;
    span {
      display: inline-block;
      line-height: 15px;
    }
    .publish-time {
      padding-right: 18px;
    }
    .play-number {
      padding-left: 18px;
    }
  }
  .video-artists {
    display: inline-block;
    margin: 11px 0 10px;
    color: #507daf;
    font-size: 13px;
    line-height: 14px;
  }
  .video-type-name {
    display: flex;
    align-items: center;
    .mv-name {
      flex: 1;
      font-size: 17px;
      line-height: 25px;
    }
    .arrow-icon {
      margin-right: 10px;
      svg {
        transition: transform .3s;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
    .mv-icon {
      margin-right: 9px;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
      font-weight: bold;
      padding: 0 4px;
      box-sizing: border-box;
      color: #d33a31;
      font-size: 9px;
      line-height: 14px;
      text-align: center;
      vertical-align: middle;

      &:after {
        border-color: #d33a31;
      }
    }
  }
}

</style>

<template>
  <div class="playlist-content-wrapper">
    <div class="playing-total">
      <i class="iconfont">&#xe60d;</i>
      <div class="playlist-total-content border-bt">播放全部
        <span>（{{currentPlayListDetail.trackCount}}）
        </span>
      </div>
    </div>
    <song-play-lists :song-play-lists="currentPlayListDetail.tracks">
    </song-play-lists>
  </div>
</template>
<script type="text/javascript">
import songPlayLists from 'common/songPlayLists';
import { mapState } from 'vuex';
export default {
  components: {
    songPlayLists
  },
  data() {
    return {

    };
  },
  methods: {},
  mounted() {},
  computed: {
    ...mapState(['currentPlayListDetail'])
  }
};

</script>
<style lang="less" scoped>
.playing-total {
  display: flex;
  align-items: center;
  .playlist-total-content {
    flex: 1;
    line-height: 55px;
    height: 55px;
    box-sizing: border-box;
    span {
      margin-left: -11px;
    }
  }
  .iconfont {
    width: 40px;
    text-align: center;
    font-size: 22px;
  }
}

</style>

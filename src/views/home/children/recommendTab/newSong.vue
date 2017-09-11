<template>
  <div class="new-song-wrapper">
    <div class="new-song">
      <h2 class="new-song-title">最新音乐</h2>
    </div>
    <song-lists :song-lists="newSongList"></song-lists>
  </div>
</template>
<script type="text/javascript">
import { fetchNewSongList } from 'service';
import songLists from 'common/songLists';
export default {
  methods: {
    async initNewSongList() {
      var res = await fetchNewSongList();
      this.newSongList = res.result;
    }
  },
  components: {
    songLists
  },
  data() {
    return {
      newSongList: []
    };
  },
  mounted() {
    this.initNewSongList();
  }
};

</script>
<style lang="less" scoped>
.new-song-wrapper {
  .new-song {
    .new-song-title {
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

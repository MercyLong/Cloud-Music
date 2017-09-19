<template>
  <div class="playlist-content-wrapper">
    <song-play-lists :total="currentPlayListDetail.trackCount" :song-play-lists="currentPlayListDetail.tracks">
    </song-play-lists>
  </div>
</template>
<script type="text/javascript">
import songPlayLists from 'common/songPlayLists';
import { mapGetters } from 'vuex';
export default {
  components: {
    songPlayLists
  },
  computed: {
    ...mapGetters(['currentPlayListDetail'])
  }
};

</script>
<style lang="less" scoped>


</style>

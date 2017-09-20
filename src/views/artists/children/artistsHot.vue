<template>
  <div class="artists-hot-wrapper">
    <song-play-lists :song-play-lists="currentArtistInfo.hotSongs"></song-play-lists>
  </div>
</template>
<script type="text/javascript">
import songPlayLists from 'common/songPlayLists';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentArtistInfo'])
  },
  components: {
    songPlayLists
  }
};

</script>
<style lang="less" scoped></style>

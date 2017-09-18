<template>
  <div class="album-content-wrapper">
    <song-play-lists :song-play-lists="currentAlbumInfo.songs">
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
    ...mapGetters(['currentAlbumInfo'])
  }
};

</script>

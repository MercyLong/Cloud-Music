<template>
  <div class="album-content-wrapper">
    <song-play-lists :total="currentAlbumInfo.album && currentAlbumInfo.album.size" :song-play-lists="currentAlbumInfo.songs">
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

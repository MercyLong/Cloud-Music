<template>
  <div class="artists-detail-info">
    <song-play-lists :song-play-lists="artistHotSongs"></song-play-lists>
  </div>
</template>
<script type="text/javascript">
import { fetchArtistDetail } from 'service';
import songPlayLists from 'common/songPlayLists';
export default {
  data() {
    return {
      id: this.$route.query.id,
      artistHotSongs: []
    };
  },
  components: {
    songPlayLists
  },
  methods: {
    async initArtistDetail() {
      let res = await fetchArtistDetail(this.id);
      this.artistHotSongs = res.hotSongs;
    }
  },
  mounted() {
    if (this.id) {
      this.initArtistDetail();
    }
  }
};

</script>
<style lang="less" scoped></style>

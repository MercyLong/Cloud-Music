<template>
  <div class="artists-header-wrapper">
    <div class="artists-header">
      <img class="absolute-full" :src="currentArtistInfo.artist&&currentArtistInfo.artist.picUrl">
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['currentArtistInfo'])
  }
};

</script>
<style lang="less" scoped>
.artists-header-wrapper {
  .artists-header {
    position: relative;
    padding-bottom: 68%;
    overflow: hidden;
  }
}

</style>

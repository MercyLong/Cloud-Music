<template>
  <section class="album-list-wrapper">
    <header-top :title="'专辑'" :has-playing-status="true"></header-top>
    <album-header></album-header>
    <album-content></album-content>
  </section>
</template>
<script type="text/javascript">
import headerTop from 'common/header';
import albumContent from './children/albumContent';
import albumHeader from './children/albumHeader';
export default {
  data() {
    return {
      albumId: this.$route.query.id
    };
  },
  components: {
    albumHeader,
    albumContent,
    headerTop
  },
  methods: {
    async initAlbumDetail() {
      this.$store.dispatch('fetchAlbumDetailByAction', this.albumId);
    }
  },
  mounted() {
    this.initAlbumDetail();
  }
};

</script>
<style lang="less" scoped></style>

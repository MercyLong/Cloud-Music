<template>
  <div class="playlist-wrapper">
    <header-top :has-playing-status="true" :title="'歌单'"></header-top>
    <playlist-header></playlist-header>
    <playlist-content></playlist-content>
  </div>
</template>
<script type="text/javascript">
import playlistHeader from './children/playlistHeader';
import playlistContent from './children/playlistContent';
import { mapActions } from 'vuex';
import headerTop from 'common/header';
export default {
  data() {
    return {
      playListId: this.$route.query.id
    };
  },
  methods: {
    ...mapActions(['fetchPlayListDetailByAction']),
    async initPlayListDetail() {
      this.fetchPlayListDetailByAction(this.playListId);
    }
  },
  mounted() {
    this.initPlayListDetail();
  },
  components: {
    playlistHeader,
    playlistContent,
    headerTop
  }
};

</script>
<style lang="less" scoped></style>

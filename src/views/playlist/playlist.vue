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
import headerTop from 'common/header';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      playListId: this.$route.query.id
    };
  },
  methods: {
    ...mapMutations(['SET_CURRENT_PLAY_LIST_DETAIL']),
    async initPlayListDetail() {
      this.$store.dispatch('fetchPlayListDetailByAction', this.playListId);
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

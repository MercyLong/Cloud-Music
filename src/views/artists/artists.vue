<template>
  <div class="artists-detail-info">
    <header-top :title="headerTitle" :has-playing-status="true">
    </header-top>
    <artists-header></artists-header>
    <artists-tab :mv-len="mvLen" :hot-len="hotLen" :album-len="albumLen"></artists-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/javascript">
import songPlayLists from 'common/songPlayLists';
import headerTop from 'common/header';
import artistsHeader from './children/artistsHeader';
import artistsTab from './children/artistsTab';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      id: this.$route.query.id
    };
  },
  components: {
    songPlayLists,
    artistsHeader,
    headerTop,
    artistsTab
  },
  computed: {
    ...mapGetters(['currentArtistInfo']),
    headerTitle() {
      return this.currentArtistInfo.artist && this.currentArtistInfo.artist.name;
    },
    hotLen() {
      return this.currentArtistInfo.artist && this.currentArtistInfo.hotSongs.length;
    },
    albumLen() {
      return this.currentArtistInfo.artist && this.currentArtistInfo.artist.albumSize;
    },
    mvLen() {
      return this.currentArtistInfo.artist && this.currentArtistInfo.artist.mvSize;
    }
  },
  methods: {
    async initArtistDetail() {
      this.$store.dispatch('fetchArtistInfoByAction', this.id);
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

<template>
  <div class="home-main-content">
    <div v-show="homeTabCurrentIndex == 0">
      <recommend></recommend>
      <new-song></new-song>
      <footer-wrapper></footer-wrapper>
    </div>
    <div v-show="homeTabCurrentIndex == 1">
      <hot-ranking></hot-ranking>
    </div>
    <div v-show="homeTabCurrentIndex == 2">
      <search></search>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex';
import recommend from './recommend';
import newSong from './newSong';
import footerWrapper from './footer';
import hotRanking from './hotRanking';
import search from './search';
export default {
  computed: {
    ...mapState(['homeTabCurrentIndex'])
  },
  components: {
    recommend,
    newSong,
    footerWrapper,
    hotRanking,
    search
  }
};

</script>
<style lang="less"></style>

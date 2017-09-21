<template>
  <div class="recommend-tab-wrapper">
    <banner-list></banner-list>
    <recommend></recommend>
    <new-song></new-song>
    <footer-wrapper></footer-wrapper>
  </div>
</template>
<script type="text/javascript">
import recommend from './recommend';
import newSong from './newSong';
import bannerList from 'common/banner';
import footerWrapper from './footer';
export default {
  components: {
    recommend,
    newSong,
    footerWrapper,
    bannerList
  }
};

</script>
<style lang="less" scoped>
.recommend-tab-wrapper {
  min-height: 100%;
  transform: translate3d(0, 0, 0);
}

</style>

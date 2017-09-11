<template>
  <div class="recommend-tab-wrapper">
    <recommend></recommend>
    <new-song></new-song>
    <footer-wrapper></footer-wrapper>
  </div>
</template>
<script type="text/javascript">
import recommend from './recommend';
import newSong from './newSong';
import footerWrapper from './footer';
export default {
  components: {
    recommend,
    newSong,
    footerWrapper
  }
};

</script>
<style lang="less" scoped>
.recommend-tab-wrapper {
  transform: translate3d(0, 0, 0);
}

</style>

<template>
  <div class="ranking-tab-wrapper">
    <hot-ranking></hot-ranking>
  </div>
</template>
<script type="text/javascript">
import hotRanking from './hotRanking';
export default {
  components: {
    hotRanking
  }
};

</script>
<style lang="less" scoped>
.ranking-tab-wrapper {
  transform: translate3d(0, 0, 0);
}

</style>

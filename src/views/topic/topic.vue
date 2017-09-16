<template>
  <div class="topic-wrapper">
    <header-top></header-top>
    <iframe frameborder="0" :src="src.url"></iframe>
  </div>
</template>
<script type="text/javascript">
import headerTop from 'common/header';
export default {
  components: {
    headerTop
  },
  data() {
    return {
      src: JSON.parse(localStorage.getItem('bannerInfo'))
    };
  }
};

</script>
<style lang="less" scoped>
.topic-wrapper {
  height: 100%;
  .header-top-wrapper {
    background: #d43c33;
  }
}

iframe {
  margin-top: 64px;
  width: 100%;
  height: 100%;
}

</style>

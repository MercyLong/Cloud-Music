<template>
  <div class="play-list-tab-wrapper">
    <play-list-tab-header></play-list-tab-header>
    <play-list-tab-content></play-list-tab-content>
  </div>
</template>
<script type="text/javascript">
import playListTabHeader from './playListTabHeader';
import playListTabContent from './playListTabContent';
export default {
  components: {
    playListTabHeader,
    playListTabContent
  }
};

</script>
<style lang="less" scoped></style>

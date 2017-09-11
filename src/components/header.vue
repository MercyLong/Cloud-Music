<template>
  <div class="header-top-wrapper">
    <i @click="$router.back(-1)" class="iconfont backTo">&#xe622;</i>
  </div>
</template>
<script type="text/javascript">
export default {};

</script>
<style lang="less">
.header-top-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  .backTo {
    color: rgba(255, 255, 255, 0.6);
    margin-left: 10px;
    font-size: 20px;
  }
}

</style>

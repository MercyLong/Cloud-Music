<template>
  <div class="high-quality-list-header-wrapper">
  </div>
</template>
<script type="text/javascript">
import { fetchHighQualityList } from 'service'；
export default {
  data() {
    return {
      offet: 0,
      limit: 20
    };
  },
  methods: {
    async initHighQualityList() {
      let result = await fetchHighQualityList();
    }
  },
  mounted() {
    this.initHighQualityList();
  }
};

</script>
<style lang="less" scoped></style>

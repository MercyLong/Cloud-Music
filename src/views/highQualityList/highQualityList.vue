<template>
  <div class="high-quality-list-wrapper">
    <high-quality-list-content :list="highQualityList"></high-quality-list-content>
  </div>
</template>
<script type="text/javascript">
import { fetchHighQualityPlayListData } from 'service';
import highQualityListContent from './children/highQualityListContent';
export default {
  data() {
    return {
      offet: 0,
      limit: 20,
      highQualityList: []
    };
  },
  components: {
    highQualityListContent
  },
  methods: {
    async initHighQualityList() {
      let result = await fetchHighQualityPlayListData({
        offset: this.offset,
        limit: this.limit
      });
      this.highQualityList = [...result.playlists];
    }
  },
  mounted() {
    this.initHighQualityList();
  }
};

</script>
<style lang="less" scoped></style>

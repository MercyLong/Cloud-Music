<template>
  <div class="search-wrapper">
    <div class="search-bar-wrapper border-bt">
      <div class="search-bar">
        <i class="u-svg u-svg-srch"></i>
        <input v-model="keyword" class="search-bar-input" type="text" name="search-bar" placeholder="搜索歌曲、歌手、专辑">
      </div>
    </div>
    <hot-search></hot-search>
  </div>
</template>
<script type="text/javascript">
import hotSearch from './hotSearch';
import { mapState, mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['SET_SEARCH_KEYWORD'])
  },
  computed: {
    ...mapState(['searchKeywords']),
    keyword: {
      get() {
        return this.searchKeywords;
      },
      set(newValue) {
        this.SET_SEARCH_KEYWORD(newValue);
      }
    }
  },
  components: {
    hotSearch
  }
};

</script>
<style lang="less">
.search-bar-wrapper {
  padding: 15px 10px;
  position: relative;
  .search-bar {
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
  }
  input {
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: transparent;
    font-size: 14px;
    color: #333;
  }
}

</style>

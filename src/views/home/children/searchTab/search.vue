<template>
  <div class="search-wrapper">
    <div class="search-bar-wrapper border-bt">
      <div class="search-bar">
        <i class="search-icon iconfont">&#xe66f;</i>
        <input v-model="keyword" class="search-bar-input" type="text" name="search-bar" :placeholder="keyword?'':'搜索歌曲、歌手、专辑'">
        <i @click="clearSearchKeywords" v-if="searchKeywords" class="search-clear iconfont">&#xe833;</i>
      </div>
    </div>
    <hot-search></hot-search>
  </div>
</template>
<script type="text/javascript">
import hotSearch from './hotSearch';
import { mapMutations, mapGetters } from 'vuex';
export default {
  methods: {
    ...mapMutations(['SET_SEARCH_KEYWORD']),
    clearSearchKeywords() {
      this.SET_SEARCH_KEYWORD(null);
    }
  },
  computed: {
    ...mapGetters(['searchKeywords']),
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
    .search-icon {
      position: absolute;
      top: 3.5px;
      left: 8px;
      font-size: 20px;
      color: #999;
    }
    .search-clear {
      padding: 5px;
      position: absolute;
      top: 1.5px;
      right: 7px;
      font-size: 16px;
      color: #999;
    }
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

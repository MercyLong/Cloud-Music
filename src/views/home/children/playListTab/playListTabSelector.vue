<template>
  <div class="play-list-tab-selector">
    <header-top :has-playing-status="true" :bg="true" :title="'筛选歌单'">
    </header-top>
    <div class="all-wrapper">{{all.name}}</div>
    <ul class="sub-list-wrapper">
      <li v-for="sub in subLists" class="sub-item-wrapper ">
        <div class="sub-item-title border-rt">
          <i class="iconfont language">&#xe747;</i>
          <div>{{sub.name}}</div>
        </div>
        <div class="top-list-wrapper">
          <div @click="selectClassifyPlayList(item)" v-for="item in sub.morelist" class="top-item border-1px">
            {{item.name}}
          </div>
        </div>
        <div v-if="sub.more" class="more-cate-list">
          <div v-for="moreCate in sub.toplist" class="more-cate-item border-1px">{{moreCate.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import headerTop from 'common/header';
import { mapMutations } from 'vuex';
import { fetchClassifyPlayListCat } from 'service';
export default {
  data() {
    return {
      subLists: [],
      all: {}
    };
  },
  components: {
    headerTop
  },
  methods: {
    ...mapMutations(['SET_PLAY_LIST_CLASSIFY_TYPE', 'SET_PLAY_LIST_CLASSIFY_INFO']),
    async initPlayListTags() {
      let res = await fetchClassifyPlayListCat();
      this.subLists = this.dataProcess(res);
      this.all = Object.assign({}, res.all);
    },
    async selectClassifyPlayList(item) {
      this.$router.back(-1);
      // 设置当前分类歌单的类型
      this.SET_PLAY_LIST_CLASSIFY_TYPE(item.name);
      this.$store.dispatch('fetchClassifyPlayListDataByAction', {
        cat: item.name,
        offset: 0,
        limit: 20
      });
    },
    dataProcess(res) {
      let ret = [];
      let cate = res.categories;
      let subList = res.sub;
      Object.keys(cate).forEach((key) => {
        ret[key] = {};
        ret[key]['toplist'] = subList.filter((val, idx) => {
          return val.category === parseInt(key);
        });
        ret[key]['name'] = cate[key];
        if (ret[key]['toplist'].length > 6) {
          ret[key]['more'] = true;
          ret[key]['morelist'] = ret[key]['toplist'].splice(0, 6);
        } else {
          ret[key]['morelist'] = [...ret[key]['toplist']];
        }
      });
      return ret;
    }
  },
  mounted() {
    this.initPlayListTags();
  }
};

</script>
<style lang="less" scoped>
.play-list-tab-selector {
  padding-top: 64px;
  background: #e1e1e1;
  .all-wrapper {
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: #fff;
  }
  .more-cate-list {
    width: 100%;
    overflow: hidden;
    div {
      width: 25%;
      height: 50px;
      line-height: 50px;
      float: left;
    }
  }
  .sub-list-wrapper {
    text-align: center;
    box-sizing: border-box;
    .sub-item-wrapper {
      overflow: hidden;
      background: #fff;
      margin-top: 10px;
    }
    .top-item {
      width: 25%;
      float: left;
      height: 50px;
      line-height: 50px;
    }
    .sub-item-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      float: left;
      width: 25%;
      height: 100px;
      color: #666;
      font-size: 14px;
      .language {
        font-size: 40px;
      }
    }
  }
}

</style>

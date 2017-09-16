<template>
  <div @click="gotoRankDetail(rankListInfo)" class="list-view-wrapper">
    <div class="cover-img-wrapper">
      <img class="cover-img" :src="coverImage">
    </div>
    <ul class="top-lists-wrapper border-bt">
      <li v-for="(item,$index) in topLists">
        <span class="order-number">{{$index + 1}}.</span> {{item.name}} -
        <template>
          <span v-for="(singer,idx) in item.artists">
                <span v-if="idx > 0">/ </span>{{singer.name}}
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
// 根据网易云音乐的API,不同的榜单是通过传入不同的idx
import { fetchTopList } from 'service';
import { replaceImageUrl } from 'config/mixin';
import { mapMutations } from 'vuex';
export default {
  props: ['listIdx'],
  data() {
    return {
      topLists: [],
      coverImage: null
    };
  },
  mixins: {
    replaceImageUrl
  },
  methods: {
    ...mapMutations(['SET_CURRENT_RANK_LIST_INFO']),
    async initTopList(idx) {
      let res = await fetchTopList(idx);
      if (res.code === 200) {
        this.rankListInfo = res.result;
        let fullTopLists = this.rankListInfo && this.rankListInfo.tracks;
        this.topLists = fullTopLists.slice(0, 3);
        this.coverImage = res.result && replaceImageUrl.changeImageType(res.result.coverImgUrl, 'webp');
      };
    },
    gotoRankDetail(item) {
      this.SET_CURRENT_RANK_LIST_INFO(item);
      this.$router.push({
        path: 'ranklist',
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.initTopList(this.listIdx);
  }
};

</script>
<style lang="less">
.list-view-wrapper {
  display: flex;
  align-items: center;
  margin-top: 4px;
  &:first-child {
    margin-top: 0;
  }
  .cover-img {
    width: 130px;
  }
  .top-lists-wrapper {
    font-size: 12px;
    padding: 0 10px;
    flex: 1;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      line-height: 30px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      .order-number {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}

</style>

<template>
  <div v-load-more="{start:loadStart,cancel:
    	loadCancel,end:loadEnd}" class="artists-album-wrapper">
    <loading v-if="showLoading"></loading>
    <ul class="artists-album-list">
      <li @click="gotoAlbum(item)" v-for="item in currentArtistAlbum.hotAlbums" class="artists-album-item ">
        <div class="img-wrapper">
          <img :src="getImageUrl(item.picUrl,100,'webp')">
        </div>
        <div class="name-wrapper border-bt">
          <div class="album-name f-hide">{{item.name}}</div>
          <div class="album-publish">{{item.publishTime|formatDate('yyyy-MM-dd')}} <span>{{item.size}}首</span></div>
        </div>
      </li>
    </ul>
    <div class="common-page-footer-wrapper">
      <div v-if="!isLoading" class="">{{loadText}}</div>
      <div v-else class="">
        <loading></loading>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getImageUrl, loadMore } from 'config/mixin';
import { setLocal } from 'config/util';
import loading from 'common/loading';
import { fetchArtistAlbum } from 'service';
export default {
  created() {
    this.id = this.$route.query.id;
  },
  data() {
    return {
      showLoading: true,
      offset: 0,
      limit: 20,
      loadText: '',
      hasMore: false,
      currentArtistAlbum: {},
      isLoading: false
    };
  },
  components: { loading },
  mixins: [getImageUrl, loadMore],
  methods: {
    gotoAlbum(item) {
      setLocal('currentAlbum', item);
      this.$router.push({
        path: '/album',
        query: {
          id: item.id
        }
      });
    },
    async fetchData() {
      let res = await fetchArtistAlbum({
        id: this.id,
        offset: this.offset,
        limit: this.limit
      });
      this.hasMore = res.more;
      this.loadText = this.hasMore ? '上拉加载' : '没有更多了';
      return res;
    },
    async initAlbum() {
      let res = await this.fetchData();
      this.currentArtistAlbum = res;
      this.showLoading = false;
    },
    async loadEnd() {
      this.isLoading = true;
      this.offset += this.limit;
      let res = await this.fetchData();
      this.currentArtistAlbum.hotAlbums = [...this.currentArtistAlbum.hotAlbums, ...res.hotAlbums];
      this.isLoading = false;
    }
  },
  mounted() {
    this.initAlbum();
  }
};

</script>
<style lang="less" scoped>
.artists-album-list {
  min-height: 100%;
  padding-left: 10px;
}

.artists-album-item {
  height: 60px;
  align-items: center;
  display: flex;
  .name-wrapper {
    margin-left: 15px;
    height: 100%;
    flex: 1;
    display: flex;
    width: 0;
    flex-direction: column;
    justify-content: center;
    .album-name {}
    .album-publish {
      font-size: 12px;
      color: #888;
    }
  }
  .img-wrapper {
    width: 50px;
    height: 50px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      right: -10px;
      width: 10px;
      height: 46px;
      background-repeat: no-repeat;
      background-size: 166px 97px;
      background-image: url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28…);
      background-position: 0 -30px;
    }
  }
}

</style>

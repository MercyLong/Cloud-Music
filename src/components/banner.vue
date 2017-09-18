<template>
  <div class="banner-list-wrapper">
    <swiper class="banner-list" :options="swiperOption" ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide class="banner-item" :key="banner.id" v-for="banner in bannerList">
        <!-- <a target="_blank" :href="banner.url">
          <img :src="banner.pic">
        </a> -->
        <img @click="gotoTopic(banner)" :src="getImageUrl(banner.pic,800,'webp')">
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script type="text/javascript">
import { fetchBannerList } from 'service';
import { getImageUrl } from 'config/mixin';
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper';
export default {
  mixins: [getImageUrl],
  methods: {
    async initBannerList() {
      var res = await fetchBannerList();
      this.bannerList = res.banners.filter((item) => {
        return item.url !== '';
      });
    },
    gotoTopic(banner) {
      // 设置本地缓存
      localStorage.setItem('bannerInfo', JSON.stringify(banner));
      this.$router.push({
        path: 'topic'
      });
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      bannerList: [],
      swiperOption: {
        autoplay: false,
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
      }
    };
  },
  mounted() {
    this.initBannerList();
  }
};

</script>
<style lang="less">
.swiper-pagination {
  .swiper-pagination-bullet {
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    background: #d43c33;
  }
}

</style>

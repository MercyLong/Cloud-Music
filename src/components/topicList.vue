<!-- 专栏列表 -->
<template>
  <div class="topic-list-wrapper">
    <ul class="topic-list">
      <li @click="gotoTopic(item)" v-for="item in topList" class="topic-item">
        <div class="topic-img-wrapper">
          <img :src="item.rectanglePicUrl">
        </div>
        <div class="topic-name-wrapper border-bt">
          <div class="topic-name f-hide">{{item.mainTitle}}</div>
          <div class="topic-read">
            <span>by {{item.creator.nickname}}</span>
            <span class="read">阅读</span>{{item.readCount|addMeasurement(4,'万')}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  props: ['topList'],
  methods: {
    gotoTopic(item) {
      // url替换处理
      item.url = `http://music.163.com${item.url}`;
      localStorage.setItem('bannerInfo', JSON.stringify(item));
      this.$router.push({
        path: '/topic'
      });
    }
  }
};

</script>
<style lang="less" scoped>
.topic-list-wrapper {
  padding-left: 10px;
  .topic-item {
    align-items: center;
    display: flex;
    height: 75px;
  }
  .topic-name-wrapper {
    margin-left: 10px;
    padding-right: 10px;
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #333;
    height: 100%;
    .topic-read {
      margin-top: 3px;
      color: #888;
      font-size: 12px;
      .read {
        margin-left: 5px;
        margin-right: 3px;
      }
    }
  }
  .topic-img-wrapper {
    width: 89px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

</style>

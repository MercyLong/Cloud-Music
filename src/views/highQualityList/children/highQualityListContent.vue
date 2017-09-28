<template>
  <div class="high-quality-list-content-wrapper">
    <ul class="high-quality-list">
      <li @click="gotoPlayList(item)" v-for="item in list" class="high-quality-item">
        <div class="img-wrapper">
          <img :src="item.coverImgUrl">
        </div>
        <div class="content-wrapper border-bt">
          <div class="name f-hide">{{item.name}}</div>
          <div class="creator"><span>by </span>
            <span>{{item.creator.nickname}}
          	</span></div>
          <div class="tips f-hide">
            <span class="tag border-1px">{{item.tag}}</span>
            <span class="desc">{{item.copywriter}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { setLocal } from 'config/util';
export default {
  props: ['list'],
  methods: {
    gotoPlayList(item) {
      item.picUrl = item.coverImgUrl;
      this.$router.push({
        path: '/playlist',
        query: {
          id: item.id
        }
      });
      setLocal('currentPlayListBaseInfo', item);
    }
  }
};

</script>
<style lang="less" scoped>
.high-quality-list-content-wrapper {
  .high-quality-list {
    .high-quality-item {
      height: 160px;
      display: flex;
      align-items: center;
      .img-wrapper {
        width: 150px;
        height: 150px;
        display: block;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        padding-right: 10px;
        margin-left: 10px;
        flex: 1;
        width: 0;
        .name {
          font-size: 14px;
        }
        .creator {
          margin-top: 10px;
          color: #888;
          font-size: 12px;
        }
        .tips {
          margin-top: 15px;
          .desc {
            color: #888;
            font-size: 12px;
          }
          .tag {
            font-size: 10px;
            display: inline-block;
            padding: 0 5px;
            color: #d33a31;
            &:after {
              border-color: #d33a31;
            }
          }
        }
      }
    }
  }
}

</style>

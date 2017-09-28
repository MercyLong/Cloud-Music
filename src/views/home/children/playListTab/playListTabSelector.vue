<template>
  <div class="play-list-tab-selector">
    <div class="all-wrapper">
      <div :class="all.name == playListClassifyType?'active':''" class="all-name border-1px">{{all.name}}</div>
    </div>
    <ul class="sub-list-wrapper">
      <li v-for="sub in subLists" class="sub-item-wrapper ">
        <div class="sub-item-title border-rt">
          <i class="iconfont language">&#xe747;</i>
          <div>{{sub.name}}</div>
        </div>
        <div class="top-list-wrapper">
          <div :class="item.name == playListClassifyType?'active':''" @click="selectClassifyPlayList(item)" v-for="item in sub.morelist" class="top-item border-1px">
            <div class="item-name">{{item.name}}
              <i v-if="item.name == playListClassifyType" class="iconfont">&#xe647;</i>
            </div>
          </div>
        </div>
        <div v-if="sub.more" class="more-cate-list">
          <div :class="moreCate.name == playListClassifyType?'active':''" @click="selectClassifyPlayList(moreCate)" v-for="moreCate in sub.toplist" class="more-cate-item border-1px">
            <div class="item-name">{{moreCate.name}}
              <i v-if="moreCate.name == playListClassifyType" class="iconfont">&#xe647;</i></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex';
export default {
  props: ['subLists', 'all'],
  methods: {
    selectClassifyPlayList(item) {
      this.SET_PLAY_LIST_CLASSIFY_TYPE(item.name);
      this.$emit('selectype', item);
    },
    ...mapMutations(['SET_PLAY_LIST_CLASSIFY_TYPE'])
  },
  computed: {
    ...mapGetters(['playListClassifyType'])
  }
};

</script>
<style lang="less" scoped>
.play-list-tab-selector {
  color: #333;
  font-size: 14px;
  background: #e1e1e1;

  .all-wrapper {
    height: 60px;
    text-align: center;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    .all-name {
      line-height: 40px;
      &.active {
        border: 1px solid rgb(212, 60, 51);
      }
    }
  }
  .more-cate-list {
    width: 100%;
    overflow: hidden;
    .more-cate-item {
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
    .top-item,
    .more-cate-item {
      position: relative;
      width: 25%;
      float: left;
      height: 50px;
      box-sizing: border-box;
      &.active {
        &:after {
          border-color: rgb(212, 60, 51);
          border-width: 2px;
        }
        .iconfont {
          position: absolute;
          right: 0;
          background: red;
        }
        .item-name {
          position: relative;
          .iconfont {
            position: absolute;
            width: 0;
            height: 0;
            right: 14px;
            top: 18px;
            color: #fff;
          }
          &:before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            right: 0;
            bottom: 0;
            border-bottom: 20px solid rgb(212, 60, 51);
            border-left: 20px solid transparent;
          }
        }
      }
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

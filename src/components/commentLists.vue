<template>
  <ul class="comments-list">
    <li v-for="item in commentLists" class="comments-item">
      <div class="comment-info">
        <div class="user-face">
          <img :src="item.user.avatarUrl">
        </div>
        <div class="user-name-and-time">
          <div class="user-name">{{item.user.nickname}}</div>
          <div class="comment-time">{{item.time|formatDate(`yyyy年MM月dd日`)}}</div>
        </div>
        <div v-if="item.likedCount" class="like-count">{{item.likedCount}}</div>
      </div>
      <div class="comment-content border-bt">
        <!-- 当没有回复的时候,直接显示内容 -->
        <div v-if="!item.beReplied.length" class="no-reply-content">
          {{item.content}}
        </div>
        <div v-else="item.beReplied.length" class="reply-content">
          回复<span class="reply-user">@{{item.beReplied[0].user.nickname}}：</span>
          <span>{{item.content}}</span>
          <div class="reply-more border-1px">
            <span class="reply-user">@{{item.beReplied[0].user.nickname}}：</span>
            <span class="reply-detail"> {{item.beReplied[0].content}}
            </span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script type="text/javascript">
export default {
  props: ['commentLists']
};

</script>
<style lang="less" scoped>
.comments-list {
  .comments-item {
    &:last-child {
      .border-bt {
        &:after {
          border: none;
        }
      }
    }
    padding-left: 10px;
  }
  .comment-content {
    padding-bottom: 11px;
    padding-right: 10px;
    margin-left: 40px;
    font-size: 14px;
    color: #333;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    line-height: 22px;
    .reply-more {
      margin-top: 5px;
      padding: 5px 10px;
    }
    .reply-user {
      color: #507daf;
      margin-right: -8px;
    }
  }

  .comment-info {
    display: flex;
    height: 46px;
    margin-top: 8px;
    align-items: center;
    .user-name-and-time {
      flex: 1;
      .user-name {
        font-size: 14px;
        line-height: 18px;
        color: #666;
      }
      .comment-time {
        position: relative;
        font-size: 12px;
        color: #999;
      }
    }
    .like-count {
      margin-right: 10px;
      font-size: 12px;
      color: #999;
    }
    .user-face {
      margin-right: 10px;
      width: 30px;
      height: 30px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>

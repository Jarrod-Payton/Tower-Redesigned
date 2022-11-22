<template>
  <div class="comment slide-in">
    <div class="card bg-dark comment-card">
      <img
        class="profile-pic"
        :src="comment.creator.picture"
        alt="Profile Picture"
      />
      <p class="comment-text">
        {{ comment.body }}
      </p>
    </div>
  </div>
</template>
<script>
import { Comment } from "../models/Comment";
export default {
  props: { comment: { type: Comment, required: true } },
  setup(props) {
    return {};
  },
};
</script>
<style scoped lang="scss">
.comment {
  margin: 5px;
  cursor: pointer;
  .comment-card {
    border-radius: 50px;
    padding: 10px;
    display: flex;
    align-content: center;
    flex-direction: row;
    .comment-text {
      font-size: 21px;
      width: 100%;
      margin-left: 10px;
      padding: 10px;
    }
    .profile-pic {
      margin-top: 5px;
      margin-left: 5px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
</style>

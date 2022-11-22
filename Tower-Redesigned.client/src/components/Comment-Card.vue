<template>
  <div class="comment">
    <div class="card bg-dark comment-card">
      <img
        class="profile-pic"
        :src="comment.creator.picture"
        alt="Profile Picture"
        @click="deleteComment()"
      />
      <p class="comment-text">
        {{ comment.body }}
      </p>
    </div>
  </div>
</template>
<script>
import { Comment } from "../models/Comment";
import { commentService } from "../services/CommentService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  props: { comment: { type: Comment, required: true } },
  setup(props) {
    return {
      async deleteComment() {
        try {
          if (
            await Pop.confirm("Are you sure you want to delete your comment?")
          ) {
            await commentService.deleteComment(props.comment.id);
          } else {
            return;
          }
        } catch (error) {
          logger.error(error, "error");
        }
      },
    };
  },
};
</script>
<style scoped lang="scss">
.comment {
  margin: 5px;
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

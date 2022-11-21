<template>
  <div class="comment">
    <div class="card p-2 m-2 bg-dark">
      {{ comment.body }}
    </div>
    <img
      class="profile-pic"
      :src="comment.creator.picture"
      alt="Profile Picture"
      @click="deleteComment()"
    />
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
  .profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>

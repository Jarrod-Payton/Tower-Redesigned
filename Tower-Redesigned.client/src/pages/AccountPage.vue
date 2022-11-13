<template>
  <div class="about">
    <div class="profile text-center">
      <h1>Welcome {{ Account.name }}</h1>
      <img class="rounded" :src="Account.picture" alt="Account Picture" />
      <p>{{ Account.email }}</p>
    </div>
    <div class="events">
      <div class="row m-0">
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="row m-0">
        <div class="col-12" v-for="comment in Comments" :key="comment._id">
          <router-link
            :to="{ name: 'Event', params: { eventId: comment.eventId } }"
            class="w-100"
          >
            <div class="card">{{ comment.body }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { resetService } from "../services/ResetService";
import { ticketService } from "../services/TicketService";
import { commentService } from "../services/CommentService";
export default {
  setup() {
    onMounted(async () => {
      await resetService.resetAll();
      await ticketService.getMyTickets();
      await commentService.getMyComments();
    });
    return {
      Events: computed(() => AppState.events),
      Account: computed(() => AppState.account),
      Comments: computed(() => AppState.comments),
    };
  },
};
</script>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>

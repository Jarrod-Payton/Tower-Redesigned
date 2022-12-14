<template>
  <div class="about" v-if="!Loading">
    <div class="centered fade-in">
      <div class="card bg-dark profile">
        <div class="text-center">
          <h1>Welcome {{ Account.name }}</h1>
          <img
            class="rounded profile-img my-3"
            :src="Account.picture"
            alt="Account Picture"
          />
          <p>{{ Account.email }}</p>
        </div>
      </div>
    </div>
    <div class="events">
      <div class="row mx-5">
        <div class="col-12">
          <h1 class="header normal-cursor">Events Your Attending</h1>
        </div>
      </div>
      <div class="row mx-5">
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
      </div>
    </div>
    <div class="comments mt-5">
      <div class="row mx-5">
        <div class="col-12">
          <h1 class="header normal-cursor">Comments You've Posted</h1>
        </div>
      </div>
      <div class="row mx-5">
        <div class="col-12" v-for="comment in Comments" :key="comment._id">
          <router-link
            :to="{ name: 'Event', params: { eventId: comment.eventId } }"
            class="w-100"
          >
            <Comment-Card :comment="comment" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { resetService } from "../services/ResetService";
import { ticketService } from "../services/TicketService";
import { commentService } from "../services/CommentService";
import { loadingService } from "../services/LoadingService";
import { modalService } from "../services/ModalService";
import { logger } from "../utils/Logger";
export default {
  setup() {
    document.title = "Tower | Account Page";
    onMounted(async () => {
      loadingService.startLoading();
      await resetService.resetAll();
      await ticketService.getMyTickets();
      await commentService.getMyComments();
      loadingService.stopLoading();
    });
    return {
      Events: computed(() => AppState.events),
      Account: computed(() => AppState.account),
      Comments: computed(() => AppState.comments),
      Loading: computed(() => AppState.loading),
    };
  },
};
</script>

<style scoped lang="scss">
.normal-cursor {
  cursor: default;
}
.profile-img {
  max-width: 100px;
}
.centered {
  display: flex;
  justify-content: center;
}
.profile {
  border-radius: 50px;
  width: 400px;
  padding: 30px;
  margin-bottom: 20px;
}
h1.header {
  color: rgba(255, 255, 255, 0.481);
  border-bottom: 5px solid rgba(255, 255, 255, 0.481);
  margin: 10px 10px;
}
</style>

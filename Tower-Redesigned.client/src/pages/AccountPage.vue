<template>
  <div class="about">
    <div class="profile text-center">
      <h1>Welcome {{ Account.name }}</h1>
      <img
        class="rounded profile-img"
        :src="Account.picture"
        alt="Account Picture"
      />
      <p>{{ Account.email }}</p>
    </div>
    <div class="events">
      <div class="row mx-5">
        <!-- Create Event Button -->
        <div class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3">
          <div class="row h-100">
            <div class="col-12 h-100">
              <div
                class="tab-card h-100 bg-dark text-primary"
                @click="create()"
              >
                <div class="text-card">+</div>
              </div>
            </div>
          </div>
        </div>
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
      <div class="row mt-5">
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
      async create() {
        try {
          modalService.toggleCreateModal();
        } catch (error) {
          logger.error(error, "error");
        }
      },
      Events: computed(() => AppState.events),
      Account: computed(() => AppState.account),
      Comments: computed(() => AppState.comments),
    };
  },
};
</script>

<style scoped lang="scss">
.profile-img {
  max-width: 100px;
}
.tab-card {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
  color: rgb(230, 230, 230);
  border-radius: 5px;
  cursor: pointer;
}
.text-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  background: rgba(128, 128, 128, 0.122);
  font-size: 100px;
  text-align: center;
  border-radius: 5px;
}
.text-card:after {
  content: "";
  width: 1px;
  height: 100%;
  vertical-align: middle;
  display: inline-block;
}
</style>

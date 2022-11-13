<template>
  <div class="event-page">
    <div class="card bg-dark m-4">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="title">
              {{ Event.name }}
              {{ Event.type }}
              {{ Event.startDate ? Event.startDate : "No Start Date Set" }}
            </div>
            <div class="body">
              <div class="cover-img">
                <img :src="Event.coverImg" alt="" />
              </div>
              <div class="info">
                {{ Event.description }}
              </div>
            </div>
            <div class="tickets">
              <div class="profile-pictures">
                <div
                  class="profile"
                  v-for="ticket in Tickets"
                  :key="ticket._id"
                >
                  <img
                    :src="ticket.attendee.picture"
                    class="profile-pic"
                    alt=""
                  />
                </div>
              </div>
              <div class="attend-btn">
                <button class="btn btn-dark" @click="changeAttendance()">
                  {{ attending }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="row m-0">
        <div class="col-12">
          <div class="create-comment">
            <textarea type="text" v-model="commentForm.editable.body" />
            <button class="submit-btn btn btn-primary" @click="createComment()">
              Post
            </button>
          </div>
        </div>
        <div class="col-12" v-for="comment in Comments" :key="comment._id">
          <Comment-Card :comment="comment" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from "@vue/runtime-core";
import { eventService } from "../services/EventService";
import { useRoute } from "vue-router";
import { commentService } from "../services/CommentService";
import { ticketService } from "../services/TicketService";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
export default {
  setup() {
    const route = useRoute();
    const attending = ref(false);
    const commentForm = reactive({ editable: {} });
    onMounted(async () => {
      await eventService.getEventById(route.params.eventId);
      await commentService.getAllComments(route.params.eventId);
      await ticketService.getEventsTickets(route.params.eventId);
    });
    watchEffect(async () => {
      AppState.tickets.forEach((ticket) => {
        if (ticket.attendeeId == AppState.account.id) {
          attending.value = true;
          return;
        }
      });
    });
    return {
      attending,
      commentForm,
      async createComment() {
        try {
          await commentService.createComment(commentForm.editable);
        } catch (error) {
          logger.error(error, "error");
        }
      },
      async changeAttendance() {
        try {
          await ticketService.changeAttendance(
            AppState.openedEvent.id,
            attending.value
          );
          attending.value = !attending.value;
        } catch (error) {
          logger.error(error, "error");
        }
      },
      Event: computed(() => AppState.openedEvent),
      Comments: computed(() => AppState.comments),
      Tickets: computed(() => AppState.tickets),
    };
  },
};
</script>
<style scoped lang="scss">
.card {
  .title {
    width: 100%;
    font-size: 34px;
  }
  .body {
    display: flex;
    .cover-img {
      width: 50%;
      margin-top: 10px;
      img {
        border-radius: 1%;
        max-width: 100%;
      }
    }
    .info {
      width: 50%;
    }
  }
  .tickets {
    margin-top: 10px;
    width: 100%;
    .profile-pictures {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .profile {
        width: 5%;
        margin: 5px 0;
        text-align: center;
        .profile-pic {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .attend-btn {
      margin-top: 10px;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
}
.comments {
  margin-top: 20px;
  .create-comment {
    textarea {
      resize: none;
      height: 10vh;
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="event-page">
    <div class="card bg-dark m-4">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="title p-3">
              <h1 class="event-name">
                {{ Event.name }}
              </h1>
              <h2 class="event-date">
                {{ Event.startDate ? Event.startDate : "No Start Date Set" }}
              </h2>
            </div>
            <div class="body">
              <div class="cover-img">
                <img :src="Event.coverImg" alt="" />
              </div>
              <div class="info">
                <h1 class="form-control">
                  {{ Event.description }}
                </h1>
                <h1>
                  {{ Event.capacity }}
                </h1>
                <h1>
                  {{ Event.location }}
                </h1>
                <h1>
                  {{ Event.type }}
                </h1>
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
                    :title="ticket.attendee.email"
                    class="profile-pic"
                    alt="Profile Picture"
                  />
                </div>
              </div>
              <div class="attend-btn">
                <button class="btn btn-primary" @click="changeAttendance()">
                  {{ Attending ? "Attending Event!" : "You are not Attending" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comments mx-3">
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
    const commentForm = reactive({ editable: {} });
    onMounted(async () => {
      await eventService.getEventById(route.params.eventId);
      await commentService.getAllComments(route.params.eventId);
      await ticketService.getEventsTickets(route.params.eventId);
    });
    return {
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
          await ticketService.changeAttendance(AppState.openedEvent.id);
        } catch (error) {
          logger.error(error, "error");
        }
      },
      Event: computed(() => AppState.openedEvent),
      Comments: computed(() => AppState.comments),
      Tickets: computed(() => AppState.tickets),
      Attending: computed(() => AppState.attendingOpenedEvent),
    };
  },
};
</script>
<style scoped lang="scss">
.card {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .event-name {
      font-size: 34px;
    }
    .event-date {
      font-size: 18px;
    }
  }
  .body {
    display: flex;
    .cover-img {
      margin-top: 10px;
      img {
        max-width: 100%;
        float: left;
        padding: 0px 10px;
        border-radius: 1%;
      }
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
          width: 40px;
          height: 40px;
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

<template>
  <div class="event-page" v-if="!Loading">
    <div class="card bg-dark m-4 fade-in">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="title bg-secondary">
              <h1 class="event-name">
                {{ Event.name }}
              </h1>
              <h2 class="event-date bg-secondary">
                {{
                  Event.startDate
                    ? new Date(Event.startDate).toLocaleString()
                    : "No Start Date Set"
                }}
              </h2>
            </div>
            <div class="body">
              <div class="top">
                <div class="cover-img">
                  <img :src="Event.coverImg" alt="Event Cover Image" />
                </div>
                <div class="info flex-scrollbar">
                  <h1 class="description">
                    {{ Event.description }}
                  </h1>
                </div>
              </div>
              <div class="bottom-row">
                <h2 class="capacity bg-secondary">
                  <span>Remaining Tickets: </span
                  >{{ Event.capacity - Tickets.length }} /
                  {{ Event.capacity }}
                </h2>
                <h3 class="location bg-secondary">
                  <i class="mdi mdi-map-marker" />{{ Event.location }}
                </h3>
                <!-- <h1>
                  {{ Event.type }}
                </h1> -->
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
          <div class="create-comment card bg-dark p-3 slide-in">
            <textarea
              type="text"
              class="form-control bg-dark"
              v-model="commentForm.editable.body"
            />
            <button
              class="submit-btn btn btn-secondary w-100 mt-2"
              @click="createComment()"
              :disabled="!commentForm.editable.body"
            >
              Post
            </button>
          </div>
        </div>
        <div class="col-12" v-for="comment in Comments" :key="comment._id">
          <Comment-Card :comment="comment" @click="deleteComment()" />
        </div>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>
<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { eventService } from "../services/EventService";
import { useRoute } from "vue-router";
import { commentService } from "../services/CommentService";
import { ticketService } from "../services/TicketService";
import { loadingService } from "../services/LoadingService";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    document.title = "Tower | Event";
    const route = useRoute();
    const commentForm = reactive({ editable: {} });
    onMounted(async () => {
      loadingService.startLoading();
      await eventService.getEventById(route.params.eventId);
      await commentService.getAllComments(route.params.eventId);
      await ticketService.getEventsTickets(route.params.eventId);
      loadingService.stopLoading();
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
      Event: computed(() => AppState.openedEvent),
      Comments: computed(() => AppState.comments),
      Tickets: computed(() => AppState.tickets),
      Attending: computed(() => AppState.attendingOpenedEvent),
      Loading: computed(() => AppState.loading),
    };
  },
};
</script>
<style scoped lang="scss">
.card {
  max-height: 800px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 20px 5px 20px;
    border-radius: 50px;
    .event-name {
      font-size: 34px;
      color: whitesmoke;
    }
    .event-date {
      color: whitesmoke;
      font-size: 18px;
      // padding: 10px 20px 10px 20px;
      // color: whitesmoke;
      // border-radius: 50px;
    }
  }
  .body {
    margin-top: 20px;
    .top {
      display: flex;
      margin-top: 10px;

      .cover-img {
        width: 50%;
        img {
          max-width: 100%;
          float: left;
          padding: 0px 10px;
          border-radius: 1%;
        }
      }
      .info {
        width: 50%;
        height: 500px;
        padding-right: 10px;
        .description {
          font-size: 25px;
          line-break: auto;
        }
      }
    }
    .bottom-row {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .capacity {
        font-size: 25px;
        color: whitesmoke;
        padding: 10px;
        border-radius: 50px;
        span {
          font-size: 15px;
          margin-right: 5px;
        }
      }

      .location {
        font-size: 20px;
        padding: 10px 20px 10px 10px;
        border-radius: 50px;
        color: whitesmoke;
        i {
          margin-right: 10px;
        }
        h3 {
          padding: 0;
        }
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
    border-radius: 20px;
    border-color: white;
    border-width: 2px;
    textarea {
      color: white;
      border-radius: 10px;
      border-color: transparent;
      border-width: 2px;
      resize: none;
      height: 10vh;
      width: 100%;
    }
  }
}
</style>

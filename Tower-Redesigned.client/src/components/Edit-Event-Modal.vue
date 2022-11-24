<template>
  <div class="modal fade" id="EditModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-info">
        <!-- I am well aware that you can put modal-header and modal-footer but I don't want the white outlines -->
        <form @submit.prevent="editEvent()">
          <div class="modal-body">
            <div class="top">
              <button
                type="button"
                class="btn-close bg-danger"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="body">
              <div class="row">
                <div class="col-12">
                  <div class="input-group mb-3">
                    <span class="input-group-text">Cover Image</span>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Optional"
                      v-model="form.coverImg"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Disney on lice....."
                      v-model="form.name"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Description</span>
                    <textarea
                      class="form-control resize-none"
                      rows="3"
                      v-model="form.description"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Location</span>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="John's House....."
                      v-model="form.location"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Start Date</span>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Start Date"
                      v-model="form.startDate"
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Capacity</span>
                    <input
                      class="form-control"
                      type="number"
                      placeholder="10,000"
                      v-model="form.capacity"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="submitting"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { modalService } from "../services/ModalService";
import { eventService } from "../services/EventService";
import { loadingService } from "../services/LoadingService";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
export default {
  setup() {
    const submitting = ref(false);
    let form = ref({
      name: null,
      description: null,
      location: null,
      startDate: null,
      capacity: null,
      coverImg: null,
      type: null,
    });
    watchEffect(async () => {
      form.value = {
        name: AppState.openedEvent?.name,
        description: AppState.openedEvent?.description,
        location: AppState.openedEvent?.location,
        startDate: AppState.openedEvent?.startDate,
        capacity: AppState.openedEvent?.capacity,
        coverImg: AppState.openedEvent?.coverImg,
        type: AppState.openedEvent?.type,
      };
    });
    const eventTypes = ref(["Concert", "Convention", "Sport", "Digital"]);
    return {
      submitting,
      form,
      eventTypes,
      async chooseType(type) {
        try {
          form.value.type = type;
        } catch (error) {
          logger.error(error, "error");
        }
      },
      async editEvent() {
        try {
          await loadingService.startLoading();
          submitting.value = true;
          await eventService.editEvent(AppState.openedEvent.id, form.value);
          form.value = {};
          await loadingService.stopLoading();
          await modalService.toggleEditEventModal();
        } catch (error) {
          submitting.value = false;
          await loadingService.stopLoading();
          logger.error(error, "error");
        }
      },
      Event: computed(() => AppState.openedEvent),
    };
  },
};
</script>
<style lang="scss">
.top {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  padding: 10px 10px 0 0;
}
.body {
  padding: 10px 0 10px 0;
  .resize-none {
    resize: none;
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  padding: 0 10px 10px 0;
  button {
    margin-left: 10px;
  }
}
</style>

<template>
  <div class="modal fade" id="CreateModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-info">
        <!-- I am well aware that you can put modal-header and modal-footer but I don't want the white outlines -->
        <form @submit.prevent="createPost()">
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
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      id="EventTypeDropdown"
                    >
                      {{ form.type ? form.type : "Event Type" }}
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="type in eventTypes" :key="type">
                        <a
                          href="#"
                          class="dropdown-item"
                          @click="chooseType(type)"
                          >{{ type }}</a
                        >
                      </li>
                    </ul>
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
                :disabled="!form.type || submitting"
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
      async createPost() {
        try {
          form.value.type = form.value.type.toLowerCase();
          console.log(form.value);
          submitting.value = true;
          await eventService.createEvent(form.value);
          form.value = {};
          modalService.toggleCreateModal();
        } catch (error) {
          submitting.value = false;
          logger.error(error, "error");
        }
      },
    };
  },
};
</script>
<style scoped lang="scss">
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

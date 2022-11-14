<template>
  <div class="home-page">
    <div class="col-12">
      <div class="note">
        <div class="row">
          <div class="col-12">
            <div class="card bg-dark m-5">
              <div class="note-text text-center px-4 pt-4 color-primary">
                Welcome to Tower, This is a place where you can host and attend
                events!
              </div>
              <div class="filters mb-3">
                <div class="row">
                  <div class="col-12 d-flex justify-content-end">
                    <button
                      class="btn filter-btn text-primary me-3"
                      data-bs-target="#collapsedFilters"
                      data-bs-toggle="collapse"
                    >
                      <i class="mdi mdi-filter-menu" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="filters collapse" id="collapsedFilters">
                <div class="row px-3 pb-3">
                  <div
                    class="col-6 col-sm-3 mb-2"
                    v-for="type in filters"
                    :key="type"
                  >
                    <button
                      class="btn btn-outline-primary w-100"
                      @click="filter(type)"
                    >
                      {{ type }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
        <div
          class="col-6 col-sm-4 col-md-3 col-xxl-2 mb-3"
          v-for="e in Events"
          :key="e.id"
        >
          <Event-Tab :event="e" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { eventService } from "../services/EventService";
import { resetService } from "../services/ResetService";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
export default {
  setup() {
    const filters = ref(["Concert", "Convention", "Sport", "Digital"]);
    const Events = ref([]);
    const activeFilter = ref("");
    onMounted(async () => {
      await resetService.resetAll();
      await eventService.getAllEvents();
    });
    watchEffect(async () => {
      let events = AppState.events;
      if (activeFilter.value !== "") {
        events = AppState.events.filter(
          (event) => event.type === activeFilter.value
        );
      }
      Events.value = events;
    });
    return {
      Events,
      activeFilter,
      filters,
      async filter(type) {
        try {
          activeFilter.value = type.toLowerCase();
        } catch (error) {
          logger.error(error, "error");
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.note-text {
  font-size: 24px;
}
.filter-btn {
  outline: none;
}
</style>

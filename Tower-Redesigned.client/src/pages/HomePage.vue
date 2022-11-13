<template>
  <div class="home-page">
    <div class="filters">
      <div class="row m-0">
        <div class="col-6 col-sm-3 mb-2" v-for="type in filters" :key="type">
          <button class="btn btn-outline-primary w-100" @click="filter(type)">
            {{ type }}
          </button>
        </div>
      </div>
    </div>
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

<style scoped lang="scss"></style>

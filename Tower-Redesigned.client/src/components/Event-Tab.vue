<template>
  <div class="row w-100">
    <div class="col-12">
      <router-link
        :to="{ name: 'Event', params: { eventId: event.id } }"
        class="w-100"
      >
        <div class="card w-100">
          <h1>{{ event.name }}</h1>
          <h3>{{ event.type }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Event } from "../models/Event";
export default {
  props: { event: { type: Event, required: true } },
  setup(props) {
    return {};
  },
};
</script>
<style scoped></style>

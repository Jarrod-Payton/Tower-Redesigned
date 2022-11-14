<template>
  <div class="row">
    <div class="col-12">
      <router-link
        :to="{ name: 'Event', params: { eventId: event.id } }"
        class="w-100"
      >
        <div class="tab-card">
          <img :src="event.coverImg" alt="Event Image" />
          <div class="text-card">
            <span>
              <h4 class="event-name">
                {{ event.name }}
              </h4>
              <h4 class="event-description">
                {{ event.description }}
              </h4>
            </span>
            <div class="bottom bg-danger">Event Cancelled</div>
          </div>
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
<style scoped lang="scss">
.tab-card {
  position: relative;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
.text-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.361);
  text-align: center;
}
.text-card:after {
  content: "";
  width: 1px;
  height: 100%;
  vertical-align: middle;
  display: inline-block;
}
.text-card span {
  display: inline-block;
  vertical-align: middle;
}
.event-name {
  font-size: 24px;
  font-weight: bold;
}
.event-description {
  font-size: 18px;
  color: white;
}
.bottom {
  position: absolute;
  width: 70%;
  bottom: 5%;
  left: 15%;
  border-radius: 5px;
  font-size: 22px;
  color: white;
}
</style>

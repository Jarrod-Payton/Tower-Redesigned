<template>
  <div class="home-page">
    <div class="row m-0">
      <div class="col-12">
        Hello
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity"
import { eventService } from '../services/EventService'
import { onMounted } from "@vue/runtime-core"
export default {
  setup() {
    const Events = ref([])
    onMounted(async () => {
      await eventService.getAllEvents()
    })
    return {}
  }
}
</script>

<style scoped lang="scss">

</style>

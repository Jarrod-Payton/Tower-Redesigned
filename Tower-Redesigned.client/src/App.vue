<template>
  <header>
  </header>
  <main>
    <Navbar />
    <router-view />
    <Profile-Edit-Offcanvas/>
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
main {
    background-image: linear-gradient(to bottom right, #D9841D, #DC5F55, #BA527C);
}
</style>

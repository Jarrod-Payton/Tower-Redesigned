<template>
  <header></header>
  <main>
    <Navbar />
    <div class="row m-0 scrollbar">
      <router-view />
    </div>
    <Profile-Edit-Offcanvas />
    <Create-Modal />
  </main>
  <footer></footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
main {
  background-image: linear-gradient(to bottom right, #d9841d, #dc5f55, #ba527c);
}
</style>

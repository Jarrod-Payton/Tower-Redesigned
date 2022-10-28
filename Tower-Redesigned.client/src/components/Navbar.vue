<template>
  <nav class="navbar navbar-expand-lg bg-transparent px-2">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <img alt="logo" src="../assets/img/crown-icon.jpg" height="50" width="50" @click="editProfile()" />
      </div>
    </router-link>
    <div class="collapse navbar-collapse" id="navbarText"></div>
    <span class="navbar-text pe-3">
      <button
        class="btn btn-outline-warning text-shadow selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div class="dropdown my-2 my-lg-0 dropstart" v-else>
        <div class="selectable rounded elevation-2" @click="editProfile">
          <img
            :src="account.picture"
            alt="user photo"
            class="rounded profile-pic"
          />
        </div>
      </div>
    </span>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed } from "vue";
import { Offcanvas } from "bootstrap";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      editProfile() {
        Offcanvas.getOrCreateInstance(
          document.getElementById("EditProfileOffCanvas")
        ).toggle();
      },
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    }
  }
}
</script>

<style scoped>
.profile-pic {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.hoverable:hover {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.navbar {
  height: 5vh;
}
</style>

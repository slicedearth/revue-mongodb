<template>
  <b-navbar toggleable="lg" type="dark" class="primecolour">
    <router-link to="/">
      <b-navbar-brand>ReVue</b-navbar-brand>
    </router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/reviews" class="nav-link mr-2">Reviews</router-link>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <Login />
        <Register />
        <b-button
          v-if="$store.state.isUserLoggedIn"
          @click="logout"
          class="btn btn-secondary"
        >Logout</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Login from "@/components/Login";
import Register from "@/components/Register";
export default {
  name: "Header",
  components: { Login, Register },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      // this.$router.push({ name: "root" }).catch(err => {});
      this.$router.go("/");
    }
  }
};
</script>

<style>
.primecolour {
  background-color: #536dfe;
}
</style>

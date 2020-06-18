<template>
  <div>
    <!-- Register Button -->
    <button
      v-if="!$store.state.isUserLoggedIn"
      @click="showModal"
      class="btn btn-secondary mr-2 my-2"
    >Register</button>
    <!-- Register Modal -->
    <b-modal ref="regModal" centered title="Register" hide-footer>
      <b-form-input
        name="email"
        type="email"
        placeholder="Enter Email"
        v-model="email"
        class="mb-3"
      ></b-form-input>
      <b-form-input type="text" name="rname" placeholder="Enter Name" v-model="name" class="mb-3"></b-form-input>
      <b-form-input
        type="password"
        name="password"
        placeholder="Enter Password"
        v-model="password"
        class="mb-3"
      ></b-form-input>
      <b-card-text
        v-html="error"
        class="error mt-3"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</b-card-text>
      <b-button variant="info" @click="register" class="w-100">Register</b-button>
    </b-modal>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      name: "",
      password: "",
      error: null
    };
  },
  methods: {
    showModal() {
      this.$refs["regModal"].show();
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          name: this.name,
          password: this.password
        });
        // console.log(this.$store);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$refs["regModal"].hide();
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style></style>

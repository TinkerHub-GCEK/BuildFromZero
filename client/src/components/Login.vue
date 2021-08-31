<template>
  <div class="wrap">
    <div class="popup">
      <h2>Login</h2>
      <Label>Email</Label>
      <input v-model="email" type="email" placeholder="Type Your Email Here" />
      <Label>Password</Label>
      <input
        v-model="password"
        type="password"
        placeholder="Type Your Password Here"
      />
      <button @click="login">Login</button>
      <button @click="toggleLogin">Cancel</button>
    </div>
  </div>
</template>

<script>
import fetchData from "@/fetchData.js";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  props: {
    toggleLogin: Function,
  },

  methods: {
    login() {
      if (this.email && this.password) {
        let email = this.email.toLowerCase().trim();
        fetchData(
          "check",
          {
            email: email,
            pass: this.password,
          },
          (json) => {
            json = JSON.parse(JSON.stringify(json));
            if (json.status == "true") {
              this.$store.commit("changeLogin", {
                email: email,
                key: json.api,
              });
              this.toggleLogin();
            } else {
              window.alert("Check Again!");
            }
          }
        );
      } else {
        window.alert("All fields are required");
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.5em);
  z-index: 3;
}

.popup {
  width: 90%;
  max-width: 36em;
  height: auto;
  max-height: 90vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 2em;
  text-align: center;
  background-color: rgba(20, 20, 40, 0.75);
  backdrop-filter: blur(0.5em);
  border-radius: 0.625em;
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
}

label {
  text-align: left;
}
</style>

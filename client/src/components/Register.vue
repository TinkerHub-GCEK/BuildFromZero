<template>
  <div class="wrap">
    <div class="popup">
      <h2>Register</h2>
      <Label>Name</Label>
      <input v-model="name" type="text" placeholder="Type Your Name Here" />
      <Label>Email</Label>
      <input v-model="email" type="email" placeholder="Type Your Email Here" />
      <Label>Phone</Label>
      <input type="phone" placeholder="Type Your Phone Number Here" />
      <label>Branch</label>
      <select v-model="branch">
        <option value="" selected disabled>Select Your Branch</option>
        <option value="CE">CE</option>
        <option value="CSE">CSE</option>
        <option value="EEE">EEE</option>
        <option value="ECE-A">ECE-A</option>
        <option value="ECE-B">ECE-B</option>
        <option value="ME">ME</option>
      </select>
      <label>Year</label>
      <select v-model="year">
        <option value="" selected disabled>Select Your Year</option>
        <option value="1">First Year</option>
        <option value="2">Second Year</option>
        <option value="3">Third Year</option>
        <option value="4">Fourth Year</option>
      </select>
      <button @click="register">Register</button>
      <button @click="toggleRegister">Cancel</button>
    </div>
  </div>
</template>

<script>
import fetchData from "@/fetchData.js";

export default {
  name: "Register",

  data() {
    return {
      email: "",
      name: "",
      phone: "",
      branch: "",
      year: "",
    };
  },

  props: {
    toggleRegister: Function,
    event: String,
  },

  register() {
    if (this.email && this.name && this.phone && this.branch && this.year) {
      let email = this.email.toLowerCase().trim();
      let name = this.name.toLowerCase().trim();
      fetchData(
        "check",
        {
          event: this.event,
          email: email,
          name: name,
          phone: this.phone,
          branch: this.branch,
          year: this.year,
        },
        (json) => {
          json = JSON.parse(json);
          if (json.status) {
            this.toggleRegister();
            window.alert("Successfully Registered");
          } else {
            window.alert("Server Error!");
          }
        }
      );
    } else {
      window.alert("All fields are required");
    }
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

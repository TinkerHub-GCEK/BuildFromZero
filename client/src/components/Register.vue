<template>
  <div class="wrap">
    <div class="popup">
      <h2>Register</h2>
      <Label>Name</Label>
      <input type="text" placeholder="Type Your Name Here" />
      <Label>Email</Label>
      <input type="email" placeholder="Type Your Email Here" />
      <Label>Phone</Label>
      <input type="phone" placeholder="Type Your Phone Number Here" />
      <label>Branch</label>
      <select>
        <option value="select" selected disabled>Select Your Branch</option>
        <option value="CE">CE</option>
        <option value="CSE">CSE</option>
        <option value="EEE">EEE</option>
        <option value="ECE-A">ECE-A</option>
        <option value="ECE-B">ECE-B</option>
        <option value="ME">ME</option>
      </select>
      <label>Year</label>
      <select>
        <option value="select" selected disabled>Select Your Year</option>
        <option value="1">First Year</option>
        <option value="2">Second Year</option>
        <option value="3">Third Year</option>
        <option value="4">Fourth Year</option>
      </select>
      <button @click="toggleRegister">Register</button>
      <button @click="toggleRegister">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  props: {
    toggleRegister: Function,
  },
};
</script>

<style scoped>
.wrap {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.5em);
  z-index: 3;
}

.popup {
  width: 90%;
  max-width: 36em;
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

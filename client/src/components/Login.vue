<template>
  <div class="wrap">
    <div class="popup">
      <h2>Login</h2>
      <Label>Email</Label>
      <input type="email" placeholder="Type Your Email Here" />
      <Label>Password</Label>
      <input type="password" placeholder="Type Your Password Here" />
      <button @click="toggleLogin">Login</button>
      <button @click="toggleLogin">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  props: {
    toggleLogin: Function,
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

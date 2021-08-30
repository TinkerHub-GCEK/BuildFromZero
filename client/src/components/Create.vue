<template>
  <div class="wrap">
    <div class="popup">
      <h2>Create Event</h2>
      <Label>Event Title</Label>
      <input type="text" placeholder="Type Event Name Here" />
      <Label>Location</Label>
      <input type="text" placeholder="Type Event Location Here" />
      <Label>Event Date</Label>
      <input type="date" />
      <Label>Event Time</Label>
      <input type="time" />
      <Label>Event Description</Label>
      <textarea placeholder="Type Event Description Here" />
      <Label>Maximum Registrations</Label>
      <input type="number" />
      <Label>Event Banner/Poster</Label>
      <input type="file" v-show="false" />
      <button style="display: block; text-align: left">Upload</button>
      <button @click="toggleCreate">Create</button>
      <button @click="toggleCreate">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",

  props: {
    toggleCreate: Function,
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

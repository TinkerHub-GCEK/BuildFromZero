<template>
  <div class="wrap">
    <div class="popup">
      <h2>Create Event</h2>
      <Label>Event Title</Label>
      <input v-model="event" type="text" placeholder="Type Event Name Here" />
      <Label>Location</Label>
      <input
        v-model="location"
        type="text"
        placeholder="Type Event Location Here"
      />
      <Label>Event Date</Label>
      <input v-model="date" type="date" />
      <Label>Event Time</Label>
      <input v-model="time" type="time" />
      <Label>Event Description</Label>
      <div class="theme">
        <quillEditor v-model:value="description" :options="config" />
      </div>
      <Label>Maximum Registrations</Label>
      <input
        v-model="max"
        value="0"
        type="number"
        placeholder="Type Number Of Maximum Registrations Here"
      />
      <p>*If don't want maximum registration limit leave it to 0</p>
      <Label>Event Banner/Poster</Label>
      <input type="file" v-show="false" />
      <button style="display: block; text-align: left">Upload</button>
      <button @click="toggleCreate">Create</button>
      <button @click="toggleCreate">Cancel</button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue3-quill";

export default {
  name: "Create",

  data() {
    return {
      config: {
        placeholder: "Type Event Description Here",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
          ],
        },
      },
      event: this.current ? this.current.event : "",
      date: this.current ? this.current.date : "",
      time: this.current ? this.current.time : "",
      location: this.current ? this.current.location : "",
      description: this.current ? this.current.description : "",
      max: this.current ? this.current.max : 0,
    };
  },

  components: {
    quillEditor,
  },

  props: {
    toggleCreate: Function,
    current: Object,
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

.theme {
  background: #ffffff;
  border-radius: 0.625em;
  color: #333;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
}

.ql-toolbar.ql-snow,
.ql-editor.ql-blank {
  border: none;
}

.ql-active {
  color: rgb(0, 255, 191) !important;
}

label {
  text-align: left;
}
</style>

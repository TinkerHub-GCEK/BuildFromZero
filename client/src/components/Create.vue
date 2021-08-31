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
        type="number"
        placeholder="Type Number Of Maximum Registrations Here"
      />
      <p>*If don't want maximum registration limit leave it to 0</p>
      <Label>Event Banner/Poster</Label>
      <input
        @change="fileChange"
        class="upload"
        accept="image/*"
        type="file"
        v-show="false"
      />
      <button style="display: block; text-align: left" @click="upload">
        {{ image ? "Uploaded" : "Upload" }}
      </button>
      <button @click="() => (current ? update() : create())">
        {{ current ? "Update" : "Create" }}
      </button>
      <button @click="toggleCreate">Cancel</button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue3-quill";
import fetchData from "@/fetchData.js";

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
      image: this.current ? this.current.image : "",
    };
  },

  components: {
    quillEditor,
  },

  props: {
    toggleCreate: Function,
    current: Object,
  },

  methods: {
    fileChange(e) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => (this.image = e.target.result);
      fileReader.readAsDataURL(e.target.files[0]);
    },

    upload() {
      document.querySelector(".upload").click();
    },

    create() {
      if (
        this.event &&
        this.date &&
        this.time &&
        this.location &&
        this.description &&
        this.image
      ) {
        if (this.$store.state.key && this.$store.state.email) {
          let date = new Date(this.date + "T" + this.time);
          fetchData(
            "add",
            {
              email: this.$store.state.email,
              pass: this.$store.state.key,
              event: this.event,
              location: this.location,
              date: date.getTime(),
              description: this.description,
              image: this.image,
              max: this.max,
            },
            (json) => {
              json = JSON.parse(json);
              if (json.status) {
                this.toggleCreate();
                window.alert("Successfully Created");
              } else {
                window.alert("Server Error!");
              }
            }
          );
        } else {
          window.alert("Not Logged In");
        }
      } else {
        window.alert("All fields are required");
      }
    },

    update() {
      if (
        this.event &&
        this.date &&
        this.time &&
        this.location &&
        this.description &&
        this.image
      ) {
        if (this.$store.state.key && this.$store.state.email) {
          let date = new Date(this.date + "T" + this.time);
          fetchData(
            "update",
            {
              email: this.$store.state.email,
              pass: this.$store.state.key,
              oldevent: this.current.event,
              event: this.event,
              location: this.location,
              date: date.getTime(),
              description: this.description,
              image: this.image,
              max: this.max,
            },
            (json) => {
              json = JSON.parse(json);
              if (json.status) {
                this.toggleCreate();
                window.alert("Successfully Updated");
              } else {
                window.alert("Server Error!");
              }
            }
          );
        } else {
          window.alert("Not Logged In");
        }
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

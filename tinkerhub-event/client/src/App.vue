<template>
  <NavBar
    :logged="logged"
    :toggleLogin="toggleLogin"
    :toggleCreate="toggleCreate"
  />
  <div class="home">
    <section>
      <div class="preview">
        <div v-if="current">
          <span></span>
          <img :src="current.image" :alt="current.event" />
          <h3>{{ current.event }}</h3>
          <div class="details">
            <p>
              Event Date: <span>{{ getDate }}</span>
            </p>
            <p>
              Event Time: <span>{{ getTime }}</span>
            </p>
            <p>
              Event Location: <span>{{ current.location }}</span>
            </p>
            <p v-if="current.max != 0">
              Maximum Registrations: <span>{{ current.max }}</span>
            </p>
            <p>
              Registrations: <span>{{ current.registered }}</span>
            </p>
          </div>
          <p v-html="current.description"></p>
          <button
            v-if="
              !logged &&
              currentEvent < upcoming.length &&
              current.max > current.registered
            "
            @click="toggleRegister"
          >
            Register
          </button>
          <p
            v-if="
              !logged &&
              currentEvent < upcoming.length &&
              current.max == current.registered
            "
            style="text-align: center; color: rgb(0, 255, 191)"
          >
            *Maximum Registrations Reached
          </p>
          <button v-if="logged" @click="toggleRegistrations">
            Registrations
          </button>
          <button v-if="logged" @click="toggleEdit">Edit Event</button>
          <button v-if="logged" @click="deleteEvent">Delete Event</button>
        </div>
      </div>
      <div class="sidebar">
        <div v-if="upcoming[0]">
          <h3>Upcoming/Current Events</h3>
          <div
            class="event"
            v-for="(event, index) in upcoming"
            :key="index"
            @click="
              (e) => {
                preview(e, index);
              }
            "
          >
            <img :src="event.image" :alt="event.event" />
            <h4>{{ event.event }}</h4>
          </div>
        </div>
        <br />
        <div v-if="previous[0]">
          <h3>Previous Events</h3>
          <div
            class="event"
            v-for="(event, index) in previous"
            :key="index"
            @click="
              (e) => {
                preview(e, upcoming.length + index);
              }
            "
          >
            <img :src="event.image" :alt="event.event" />
            <h4>{{ event.event }}</h4>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Register
    v-if="register"
    :toggleRegister="toggleRegister"
    :event="current.event"
    :getEvents="getEvents"
    :fetchData="fetchData"
  />
  <Login v-if="login" :toggleLogin="toggleLogin" :fetchData="fetchData" />
  <Create
    v-if="create"
    :toggleCreate="toggleCreate"
    :current="{}"
    :getEvents="getEvents"
    :fetchData="fetchData"
  />
  <Create
    v-if="edit"
    :toggleCreate="toggleEdit"
    :current="current"
    :getEvents="getEvents"
    :fetchData="fetchData"
  />
  <Registrations
    v-if="registrations"
    :toggleRegistrations="toggleRegistrations"
    :event="current.event"
    :getEvents="getEvents"
    :fetchData="fetchData"
  />
  <vue-progress-bar></vue-progress-bar>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Create from "./components/Create.vue";
import Registrations from "./components/Registrations.vue";

const appendLeadingZeroes = (num) => {
  if (num <= 9) {
    return "0" + num;
  }
  return num;
};

export default {
  name: "App",

  components: {
    NavBar,
    Register,
    Login,
    Create,
    Registrations,
  },

  data() {
    return {
      register: false,
      login: false,
      create: false,
      edit: false,
      registrations: false,
      upcoming: [],
      previous: [],
      currentEvent: 0,
    };
  },

  computed: {
    logged() {
      return this.$store.state.logged;
    },

    current() {
      return this.currentEvent < this.upcoming.length
        ? this.upcoming[this.currentEvent]
        : this.previous[this.currentEvent - this.upcoming.length];
    },

    getDate() {
      const date = new Date(this.current.date);

      return (
        appendLeadingZeroes(date.getDay()) +
        "-" +
        appendLeadingZeroes(date.getMonth() + 1) +
        "-" +
        date.getFullYear()
      );
    },

    getTime() {
      const date = new Date(this.current.date);

      return date.getHours() <= 12
        ? appendLeadingZeroes(date.getHours()) +
            ":" +
            appendLeadingZeroes(date.getMinutes()) +
            "AM"
        : appendLeadingZeroes(date.getHours() - 12) +
            ":" +
            appendLeadingZeroes(date.getMinutes()) +
            "PM";
    },
  },

  created() {
    this.getEvents();
  },

  methods: {
    fetchData(url, postData, func) {
      this.$Progress.start();
      fetch("/" + url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          func(json);
          this.$Progress.finish();
        });
    },

    toggleRegister() {
      this.register = !this.register;
    },

    toggleLogin() {
      this.login = !this.login;
    },

    toggleCreate() {
      this.create = !this.create;
    },

    toggleEdit() {
      this.edit = !this.edit;
    },

    toggleRegistrations() {
      this.registrations = !this.registrations;
    },

    preview(e, index) {
      this.currentEvent = index;
      try {
        document.querySelector(".active").classList.remove("active");
      } catch {
        // Ignore error
      }
      e.path[1].classList.add("active");
      window.scrollTo(0, 0);
    },

    getEvents() {
      this.fetchData("get", {}, (json) => {
        json = JSON.parse(JSON.stringify(json));
        if (json.status == "true") {
          this.upcoming = json.upcoming;
          this.previous = json.previous;
          if (this.current) {
            try {
              window.setTimeout(() => {
                document.querySelector(".event").classList.add("active");
              }, 1000);
            } catch {
              // Ignore error
            }
          }
        } else {
          window.alert("Server Error!");
        }
      });
    },

    deleteEvent() {
      if (window.confirm("Are You Sure?")) {
        this.fetchData(
          "delete",
          {
            email: this.$store.state.email,
            pass: this.$store.state.key,
            event: this.current.event,
          },
          (json) => {
            json = JSON.parse(JSON.stringify(json));
            if (json.status == "true") {
              this.getEvents();
              window.alert("Successfully Deleted");
            } else {
              window.alert("Server Error!");
            }
          }
        );
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
  border-radius: 10px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  background-image: url("./assets/back.svg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

h1,
h2,
h3,
h4 {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
}

button,
input[type="submit"] {
  cursor: pointer;
  background: rgb(0, 255, 191);
  color: rgb(0, 0, 0);
  border-radius: 0.625em;
  padding: 0.625em 1.25em;
  margin: 0.625em;
  font-size: 1em;
  border: none;
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-out;
}

button:hover,
input[type="submit"]:hover {
  background: rgb(255, 53, 101);
  color: rgb(255, 255, 255);
  transition: all 0.5s ease-out;
}

input:not(input[type="submit"]),
textarea {
  resize: none;
  background: #fff;
  color: #333;
  border-radius: 0.625em;
  padding: 0.625em 1.25em;
  margin: 0.625em 0;
  font-size: 1em;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  border: none;
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
  outline: none !important;
}

label {
  margin: 0.625em;
  color: rgb(0, 255, 191);
  display: block;
}

input:not(input[type="submit"]),
textarea {
  width: 31em;
  max-width: 70vw;
}

textarea {
  height: 12.5em;
}

select {
  display: block;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  border-radius: 0.625em;
  padding: 0.625em 1.25em;
  margin: 0.625em;
  font-size: 1em;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  border: none;
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
  outline: none !important;
}

@media only screen and (max-width: 600px) {
  ::-webkit-scrollbar {
    width: 3px;
  }
}
</style>

<style scoped>
.home {
  width: 100%;
  margin-top: 4em;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.5em);
  display: grid;
  justify-content: center;
}

section {
  width: 100vw;
  max-width: 1366px;
  height: calc(100vh - 4em);
  display: grid;
  grid-template-columns: 70% 30%;
}

.preview,
.sidebar {
  height: calc(100vh - 8em);
  overflow: hidden;
  overflow-y: auto;
  margin: 2em;
  padding: 2em;
}

.preview {
  text-align: center;
}

.preview p {
  text-align: left;
}

.sidebar {
  background-color: rgba(20, 20, 40, 0.75);
  backdrop-filter: blur(0.5em);
  border-radius: 0.625em;
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
}

.sidebar img {
  width: 100%;
  height: auto;
}

img {
  border-radius: 0.625em;
}

.preview img {
  width: 100%;
  max-width: 500px;
  height: auto;
}

h3 {
  color: rgb(0, 255, 191);
}

.event {
  cursor: pointer;
}

.event h4 {
  transition: all 0.5s ease-out;
}

.event img {
  transition: all 0.5s ease-out;
}

.event:hover h4 {
  color: rgb(255, 53, 101);
  transition: all 0.5s ease-out;
}

.active h4 {
  color: rgb(255, 53, 101);
  transition: all 0.5s ease-out;
}

.event:hover img {
  filter: opacity(0.7);
  transition: all 0.5s ease-out;
}

.details p {
  margin: 0.5em;
  display: inline-block;
}

p span {
  color: rgb(0, 255, 191);
}

@media only screen and (max-width: 1000px) {
  section {
    grid-template-columns: 60% 40%;
  }
}

@media only screen and (max-width: 800px) {
  section {
    grid-template-columns: 50% 50%;
  }
}

@media only screen and (max-width: 600px) {
  section {
    grid-template-columns: 1fr;
  }

  .preview,
  .sidebar {
    height: auto;
    margin: 1em;
    overflow: visible;
  }

  section {
    height: auto;
  }
}
</style>

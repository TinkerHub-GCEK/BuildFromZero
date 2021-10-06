<template>
  <nav>
    <section>
      <div class="logo">
        <p>TinkerHub GCEK</p>
      </div>
      <ul>
        <li v-if="!logged" @click="toggleLogin">
          <a href="#"><button style="margin: 0">Coordinator Login</button></a>
        </li>
        <li v-if="logged" @click="toggleCreate">
          <a href="#"><button style="margin: 0">Create Event</button></a>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  props: {
    logged: Boolean,
    toggleLogin: Function,
    toggleCreate: Function,
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  color: #eee;
  display: flex;
  justify-content: center;
}

nav section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 4em;
  padding: 0 1em;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.5em);
  user-select: none;
}

.logo p {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  font-size: 1.75em;
  padding: none;
  margin: none;
  color: rgb(0, 255, 191);
  transition: all 0.5s ease-out;
  display: inline-block;
}

.logo p:hover {
  color: rgb(255, 53, 101);
  transition: all 0.5s ease-out;
}

ul {
  display: flex;
  list-style: none;
  width: 40%;
  justify-content: right;
}

@media only screen and (max-width: 799px) {
  ul {
    width: 50%;
  }
}

@media screen and (max-width: 800px) {
  .logo p {
    font-size: 1.2em;
  }

  button {
    padding: 0.5 1em;
    margin: 0.5em;
    font-size: 0.8em;
  }
}
</style>

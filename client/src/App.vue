<template>
  <nav>
    <section :class="scrolled ? 'scrolled' : ''">
      <div class="logo">
        <router-link to="/" exact>
          <p>TinkerHub GCEK</p>
        </router-link>
      </div>

      <ul :class="showMenu ? 'slide' : ''">
        <li class="pad" @click="close">
          <router-link to="/" exact>Home</router-link>
        </li>
        <li class="pad" @click="close">
          <router-link to="/admin">Manage</router-link>
        </li>
        <li class="pad" @click="close">
          <a href="#">About</a>
        </li>
        <li @click="close">
          <a href="#"><button>Coordinator Login</button></a>
        </li>
      </ul>
      <div
        :class="showMenu ? 'menu-bars open' : 'menu-bars'"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      showMenu: false,
      scrolled: false,
    };
  },

  mounted() {
    const scroll = () => {
      if (window.scrollY > 90) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    };

    window.addEventListener("scroll", scroll);
  },

  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    close() {
      this.showMenu = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
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
</style>

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
  z-index: 1;
  top: 0;
  width: 100%;
  height: 4em;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(0.5em);
  user-select: none;
}

.scrolled {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 0.5em 0.0625em rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-out;
}

.logo p {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  font-size: 1.75em;
  padding: none;
  margin: none;
  display: inline-block;
}

.logo a {
  text-decoration: none;
  display: flex;
  place-items: center;
  color: rgb(0, 255, 191);
  transition: all 0.5s ease-out;
}

.logo a:hover {
  color: rgb(255, 53, 101);
  transition: all 0.5s ease-out;
}

nav ul.slide {
  transform: translateX(0);
}

/* Hamburger */
.menu-bars {
  display: none;
  flex-direction: column;
  height: 1.25em;
  justify-content: space-between;
  position: relative;
}

.menu-bars span {
  display: block;
  width: 1.75em;
  height: 0.1875em;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  border-radius: 0.1875em;
  transition: all 0.3s;
}

.menu-bars span:nth-child(1) {
  transform-origin: 0 0;
}

.menu-bars span:nth-child(3) {
  transform-origin: 0 100%;
}

.open span:nth-child(1) {
  background-color: rgb(255, 255, 255);
  transform: rotate(45deg) translate(-1px, -1px);
}

.open span:nth-child(3) {
  background-color: rgb(255, 255, 255);
  transform: rotate(-45deg) translate(-1px, 0);
}

.open span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

ul {
  display: flex;
  list-style: none;
  width: 40%;
  justify-content: space-between;
}

ul li a {
  color: #eee;
  text-decoration: none;
  font-size: 1em;
  transition: all 0.5s ease-out;
}

ul li a:hover {
  color: rgb(0, 255, 191);
  text-decoration: none;
  font-size: 1em;
  transition: all 0.5s ease-out;
}

.pad {
  padding: 0.625em 1.25em;
}

@media only screen and (max-width: 799px) {
  ul {
    width: 50%;
  }
}

@media screen and (min-width: 800px) {
  .scrolled {
    width: 90%;
    max-width: 1900px;
    margin: 0.625em auto;
    border-radius: 0.625em;
  }
}

@media screen and (max-width: 800px) {
  nav section {
    position: fixed;
  }

  .logo p {
    font-size: 1.2em;
  }
}

@media only screen and (max-width: 600px) {
  .menu-bars {
    display: flex;
  }

  nav ul {
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    margin: 0;
    height: 0;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1em);
    transition: width 1s;
  }

  nav ul li a {
    display: none;
    font-size: 1.5em;
  }

  .slide {
    width: 80%;
    height: 100vh;
    transition: width 1s;
  }

  .slide li a {
    display: contents;
  }
}
</style>

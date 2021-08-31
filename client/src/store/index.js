import { createStore } from "vuex";

export default createStore({
  state: {
    logged: false,
    key: "",
    email: "",
  },

  mutations: {
    changeLogin(state) {
      state.logged = !state.logged;
    },

    changeKey(state, email, key) {
      state.email = email;
      state.key = key;
    },
  },

  actions: {},
});

import { createStore } from "vuex";

export default createStore({
  state: {
    logged: false,
    key: "",
    email: "",
  },

  mutations: {
    changeLogin(state, data) {
      state.logged = !state.logged;
      state.email = data.email;
      state.key = data.key;
    },
  },

  actions: {},
});

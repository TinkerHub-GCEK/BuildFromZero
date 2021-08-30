import { createStore } from "vuex";

export default createStore({
  state: {
    logged: true,
  },

  mutations: {
    changeLogin(state) {
      state.logged = !state.logged;
    },
  },

  actions: {
    login(context) {
      context.commit("changeLogin");
    },
  },
});

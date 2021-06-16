import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    setBooks(state, payload) {
      state.books = payload;
    },
    SET_LOGGED_USER(state, payload) {
      localStorage.removeItem("user");
      localStorage.setItem("user", payload);
      state.user = payload;
    },
    SET_EXPIRES_TOKEN(state, payload) {
      localStorage.removeItem("expires");
      localStorage.setItem("expires", payload);
      state.expires = payload;
    },
    SET_CURRENT_TOKEN(state, payload) {
      localStorage.removeItem("token");
      localStorage.setItem("token", payload);
      let d = new Date("2021-12-17T03:24:00").toUTCString();
      document.cookie = "access_token=" + payload + ";" + d + ";path=/";
      state.token = payload;
    },
  },
  modules: {}
});

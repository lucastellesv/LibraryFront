import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    setBooks(state, payload) {
      state.books = payload;
    }
  },
  actions: {
    async getBooks({ commit }) {
      try {
        const response = await api.get("https://localhost:5001/api/Book");
        commit("setBooks", response.data);
      } catch {
        commit("setBooks", []);
      }
    }
  },
  modules: {}
});

<template>
  <v-app-bar app color="primary" dark>
    <div>
      <v-toolbar-title
        class="hidden-sm-and-down ml-6"
        @click="goToHome()"
        style="cursor: pointer"
        ><h1>LibNow</h1>
      </v-toolbar-title>
    </div>

    <v-spacer class="subtitle">
      <h4>Encontre boas leituras aqui!</h4>
    </v-spacer>

    <v-btn
      class="register-button"
      fab
      dark
      color="indigo darken-2"
      :loading="loading"
      :disabled="loading"
      href="/register"
    >
      <v-icon class="register-icon" dark> mdi-plus </v-icon>
    </v-btn>

    <v-autocomplete
      v-model="search"
      :loading="loading"
      :items="items"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Busque um livro"
      solo-inverted
    >
      <v-btn
        color="indigo darken-2"
        class="hidden-sm-and-down"
        slot="append"
        rounded
        @click="searchBook"
      >
        <v-icon class="search-icon"> mdi-magnify </v-icon>
      </v-btn>
    </v-autocomplete>
  </v-app-bar>
</template>

<script>
import api from '../services/api'
export default {
  name: "AppBar",
  created() {
      this.Getbooks()
      this.books = this.$store.state.books;
      this.$store.state.books.map((book) => {
        this.items.push(book.title);
      });
  },
  data() {
    return {
      books: [],
      loading: false,
      items: [],
      search: null,
    };
  },
  methods: {
    searchBook() {
      const searchedBook = this.books.find(
        (book) => book.title.toLowerCase() == this.search.toLowerCase()
      );
      this.$router.push(`/about/${searchedBook.id}`);
    },
    goToHome() {
      if (this.$route.name != "Home") {
        this.$router.push("/");
      }
    },
    async Getbooks() {
      const response = await api.get("https://localhost:5001/api/Book");
      this.books = response.data
    },
  },
  computed: {
    searchedBooks() {
      return this.books.filter(
        (book) => book.title.toLowerCase() == this.search.toLowerCase()
      );
    },
  },
};
</script>

<style>
.subtitle {
  place-content: center;
  margin-left: 70px;
}
</style>


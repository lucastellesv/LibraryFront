<template>
  <div class="home mr-3 ml-3 mt-8" dark>
    <v-row>
      <v-col v-for="book in books" :key="book.id">
        <Book @update="Getbooks" :book="book" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Book from "../components/Book";
import api from '../services/api'
export default {
  name: "Home",
  created() {
    this.Getbooks();
  },
  data() {
    return {
      page: 1,
      books: []
    };
  },
  components: {
    Book
  },
  methods: {
    async Getbooks() {
      const response = await api.get("https://localhost:5001/api/Book");
      this.books = response.data
    }
  }
};
</script>

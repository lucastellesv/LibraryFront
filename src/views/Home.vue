<template>
  <div class="home mr-3 ml-3 mt-8" dark>
    <v-row>
      <v-col v-for="book in books" :key="book.id">
        <Book :book="book" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Book from "../components/Book";
export default {
  name: "Home",
  created() {
    this.$store.dispatch("getBooks");
  },
  data() {
    return {
      page: 1
    };
  },
  components: {
    Book
  },
  computed: {
    books() {
      return this.$store.state.books;
    }
  }
};
</script>

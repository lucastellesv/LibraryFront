<template>
  <div class="home mr-3 ml-3 mt-8" dark>
    <v-row>
      <v-col v-for="book in books" :key="book.id">
        <Book @update="Getbooks" :book="book" />
      </v-col>
    </v-row>
     <v-pagination
      v-model="filter.page"
      :length="filter.totalPages"
      @input="Getbooks"
      circle
    ></v-pagination>
  </div>
</template>

<script>
import Book from "../../../components/Book.vue";
import api from "../../../services/api";
export default {
  name: "Home",
  created() {
    this.Getbooks();
  },
  data() {
    return {
      books: [],
      filter: {
        page: 1,
        totalPages: 1,
      },
    };
  },
  components: {
    Book,
  },
  methods: {
    async Getbooks() {
      const response = await api.post(
        "https://localhost:44310/api/Book/list",
        this.filter
      );
      console.log(response);
      this.books = response.data.books;
      this.filter.page = response.data.pager.currentPage;
      this.filter.totalPages = response.data.pager.totalPages;
    },
    nextPage() {
      this.filter.page += 1;
      this.Getbooks();
    },
  },
};
</script>

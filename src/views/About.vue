<template>
  <div
    class="d-flex flex-column align-center justify-center"
    dark
    style="width: 100%"
  >
    <v-card class="ma-5" max-width="100%">
      <v-carousel :show-arrows="true" style="height: 100%" class="image-carousel">
        <v-carousel-item
          v-for="(image, i) in book.images"
          :key="i"
          :src="image.url"
        ></v-carousel-item>
      </v-carousel>
    </v-card>
    <v-card dark class="book-infos" width="70%">
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-subtitle>{{ book.gender }}</v-card-subtitle>
      <v-card-text>{{ book.author }}</v-card-text>
      <v-card-text>{{ book.description }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "About",
  computed: {
    book() {
      const books = this.$store.state.books;
      return books.find(book => book.id == this.$route.params.id);
    }
  }
};
</script>

<style>
.image-carousel{
  margin-top: 50px;
}
.book-infos{
  margin-top: 50px;
}
</style>

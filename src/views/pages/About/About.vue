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
import api from '../../../services/api'
export default {
  name: "About",
  created(){
    this.Getbook()
  },
  methods: {
    async Getbook() {
      const response = await api.get(`/api/Book/${this.$route.params.id}`);
      this.book = response.data
    }
  },
  data(){
    return{
      book: Object
    }
  }
};
</script>

<style>
.image-carousel{
  margin-top: 10vh;
}
.book-infos{
  margin-top: 10vh;
}
</style>

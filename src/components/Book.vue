<template>
  <v-card class="mx-auto" shaped max-width="420" dark>
    <v-img :src="book.images[0].url" height="440px"></v-img>

    <v-card-title>
      {{ book.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ book.gender }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="blue darken-1" light @click="goTo(`/about/${book.id}`)">
        Ver sobre
      </v-btn>
      <v-btn color="blue darken-1" light v-on:click="deleteBook" href="/home">
        Excluir
      </v-btn>


      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ book.author }}
        </v-card-text>
        <v-card-text>
          {{ book.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import api from '../services/api'
export default {
  name: "Book",
  props: {
    book:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      show: false
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
      async deleteBook(){
      const response = await api.delete(`https://localhost:5001/api/Book/${this.book.id}`, this.book);
      console.log(response);
    }
  }
};
</script>

<style>
.mx-auto{
  margin-top: 50px;
}
</style>
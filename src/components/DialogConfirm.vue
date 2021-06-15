<template>
  <div class="text-center">
    <v-sheet
      class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
      id="main-content"
      color="white"
      elevation="20"
      >
      <div class="black--text text-body-2 mb-4">
        Você tem certeza que quer deletar esse livro? (Essa alteração não pode
        ser desfeita)
      </div>

      <v-btn class="ma-1" color="grey" plain @click="close">
        Cancelar
      </v-btn>

      <v-btn class="ma-1" color="error" plain @click="deleteBook">
        Sim
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
import api from '../services/api'
export default {
  name: "DialogConfirm",
  props: {
      book: Object
  },
  methods: {
    deleteBook() {
        api.delete(
        `/api/Book/${this.book.id}`
      ).then(() =>{
      this.$emit("close");
      })
    },
    close(){
        this.$emit("close");
    }
  },
};
</script>

<style scoped>
#main-content{
  margin-top: 52vh;

}
</style>
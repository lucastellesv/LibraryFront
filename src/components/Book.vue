<template>
  <v-card class="mx-auto" shaped max-width="420">
    <v-img :src="book.images[0].url" height="440px"></v-img>

    <v-card-title>
      {{ book.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ book.gender }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="blue darken-1" light @click="goTo(`/about/${book.id}`)">
        Sobre
      </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="blue darken-1" light v-bind="attrs" v-on="on"
          class="buttom-delete"
          >
            Excluir
          </v-btn>
        </template>
        <DialogConfirm :book="book" @close="update"/>
      </v-dialog>

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
import DialogConfirm from "../components/DialogConfirm.vue";
export default {
  name: "Book",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  components: {
    DialogConfirm,
  },
  data() {
    return {
      show: false,
      dialog: false
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    update(){
      this.dialog=false
      this.$emit("update")
    }
  },
};
</script>

<style>
.mx-auto {
  margin-top: 5vh;
}
.buttom-delete{
  margin-left: 20px;
}
</style>
<template>
  <v-container fill-height>
    <v-layout align-center justify-center fill-height>
      <v-snackbar v-model="snackbarSuccess" :timeout="3000">
        O livro foi registrado com sucesso!
      </v-snackbar>
      <v-snackbar v-model="snackbarFailed" :timeout="3000">
        Não foi possivel registrar o livro.
      </v-snackbar>
      <v-flex xs12 sm8 md6>
        <v-card-title class="card-title"><p>CADASTRE SEU LIVRO</p></v-card-title>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="mdi-film"
                name="title"
                label="Titulo"
                type="text"
                v-model="title"
                :rules="titleRules"
                required
              />
              <v-text-field
                id="author"
                prepend-icon="mdi-account"
                name="author"
                label="Autor(a)"
                type="text"
                v-model="author"
                :rules="authorRules"
                required
              />

              <v-text-field
                prepend-icon="mdi-alphabetical-variant"
                name="language"
                label="Lingua"
                type="text"
                v-model="language"
                :rules="languageRules"
                required
              />

              <v-textarea
                id="description"
                prepend-icon="mdi-clipboard-text"
                name="description"
                label="Descrição"
                type="text"
                v-model="description"
                :rules="descriptionRules"
                required
              />

              <v-text-field
                prepend-icon="mdi-google-circles-extended"
                name="gender"
                label="Gênero"
                type="text"
                v-model="gender"
                :rules="genderRules"
                required
              />

              <v-file-input
                multiple
                solo
                v-model="images"
                :rules="imageRules"
                @change="setImage($event)"
                label="Imagem"
                filled
                prepend-icon="mdi-camera"
                required
              ></v-file-input>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="!valid" @click="submit">
              Registrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from "../services/api";

export default {
  name: "Register",
  data() {
    return {
      valid: false,
      title: "",
      titleRules: [
        v => !!v || "É necessário informar o título do livro",
        v => (v && v.length > 0) || "É necessário informar o titulo do livro"
      ],
      author: "",
      authorRules: [
        v => !!v || "É necessario informar o nome do autor.",
        v => (v && v.length >= 1)  || "O nome do autor deve possuir pelo menos 1 caracter."
      ],
      language: "",
      languageRules: [
        v => !!v || "A língua do livro precisa ser informada.",
        v => (v && v.length >= 2)  || "A lingua deve possuir ao menos 2 caracteres (Ex:PT)."
      ],
      description: "",
      descriptionRules: [
        v => !!v || "A descrição do livro precisa ser informada.",
        v =>
          (v && v.length >= 15) || "A descrição precisa ter no minimo 15 caracteres."
      ],
      gender: "",
      genderRules: [
        v => !!v || "É necessário informar o gênero do livro",
        v => (v && v.length > 2) || "O gênero precisa ter no minimo 2 caracteres."
      ],
      images: null,
      imageRules: [v => !!v || "É necessário o upload de uma imagem."],
      selectedImages: [],
      snackbarSuccess: false,
      snackbarFailed: false
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const book = {
            Title: this.title,
            Description: this.description,
            Author: this.author,
            Language: this.language,
            Gender: this.gender,
            Images: this.selectedImages
          };
          const response = await api.post("https://localhost:5001/api/Book", book);
          console.log(response);
          this.snackbarFailed = true;
          this.$router.push("/");
        } catch {
          this.snackbarFailed = true;
        }
      } else {
        console.log("Tem algo errado");
      }
    },
    setImage() {
      this.images.map(image => {
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          this.selectedImages.push({ Url: reader.result });
        };
      });
    }
  }
};
</script>

<style>
.card-title{
  place-content: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 30px;
  color: #252525;

  padding: 15px;
}
.main-card{
  margin-top: 50px;
}
</style>
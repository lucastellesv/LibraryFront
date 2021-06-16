<template>
  <v-container id="register" class="fill-height justify-center" tag="section">
    <v-snackbar v-model="snackbarSuccess" :timeout="3000">
      O usuario foi registrado com sucesso!
    </v-snackbar>
    <!-- <v-snackbar v-model="snackbarFailed" :timeout="3000">
      Não foi possivel registrar o livro.
    </v-snackbar> -->
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card color="white" width="400" light class="px-5 py-3 mt-10">
          <v-card-text class="text-center">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="currentUser.userName"
                @keydown.enter="register"
                color="primary"
                label="Usuario..."
                prepend-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="currentUser.email"
                @keydown.enter="register"
                color="primary"
                label="Email..."
                prepend-icon="mdi-account"
                required
              />

              <v-text-field
                v-model="currentUser.password"
                :rules="[
                  (v) => !!v || 'Senha requerida',
                  (v) =>
                    v.length > 5 || 'A senha deve ter no mínimo 5 caracteres',
                ]"
                @keydown.enter="register"
                class="mb-8"
                color="primary"
                label="Senha..."
                prepend-icon="mdi-lock-outline"
                type="password"
              />
              <v-text-field
                v-model="currentUser.passwordConfirm"
                :rules="[
                  (v) => v == currentUser.password || 'As senhas não batem',
                  (v) => !!v || 'Confirmação de senha requerida',
                ]"
                @keydown.enter="register"
                class="mb-8"
                color="primary"
                label="Confirmar senha..."
                prepend-icon="mdi-lock-outline"
                type="password"
              />
            </v-form>

            <v-btn
              :disabled="!valid"
              large
              color="success"
              @click="register"
              :loading="loading"
            >
              <p style="color: white; margin-bottom: 0px">Registrar-se</p>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<style scoped>
a {
  margin-bottom: 10px;

  text-decoration: none;
  font-size: 0.9rem;
  color: #23ce6b;

  transition: 300ms;
}

a:hover {
  font-size: 1rem;
  color: #23ce6b;
}
</style>
<script>
import api from "../../../services/api";
export default {
  props: {
    user: Object,
  },
  created(){
    if (this.user) {
      this.currentUser = this.user
    }
  },

  data: () => ({
    loading: false,
    error: false,
    valid: true,
    snackbarSuccess: false,
    snackbarFailed: false,
    currentUser: {
      userName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  }),

  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    goTo(route) {
      this.$router.push(route);
    },

    async register() {
      this.loading = true;
      const user = {
        Id: null,
        Password: this.currentUser.password,
        Email: this.currentUser.email,
        UserName: this.currentUser.userName,
      };
      await api.post("https://localhost:44310/User/register", user).then(() => {
        this.loading = false;
        this.snackbarSucess = true;
        this.$emit('toLogin');
      });
    },
  },
};
</script>

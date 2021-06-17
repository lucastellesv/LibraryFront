<template>
  <v-container id="login" class="fill-height justify-center" tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card
          color="white"
          width="400"
          light
          class="px-5 py-3 mt-10"
        >

          <v-card-text class="text-center">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="userName"
                @keydown.enter="login"
                color="primary"
                label="Usuario"
                prepend-icon="mdi-account"
                required
              />

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                @keydown.enter="login"
                class="mb-8"
                color="primary"
                label="Senha..."
                prepend-icon="mdi-lock-outline"
                type="password"
              />
            </v-form>
            <a @click="$router.push({ name: 'ForgotPassword' })">
              <p>Esqueci minha senha</p>
            </a>
            <v-btn
              :disabled="!valid"
              large
              color="success"
              @click="login"
              :loading="loading"
            >
              <p style="color: white; margin-bottom: 0px">entrar</p>
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
import api from '../../../services/api'
export default {
 name: "Login",

  
  data: () => ({

    loading: false,
    error: false,
    valid: true,
    userName: "",
    password: "",
    passwordRules: [(v) => !!v || "Senha requerida"],
  }),

  methods: {
    validate() {
      return this.$refs.form.validate();
    },


    async login() {
      if (this.validate()) {
        const user = {
          UserName: this.userName,
          Email: this.userName,
          Password: this.password,
        };

        this.loading = true;

        await api.post("https://localhost:44310/User/token", user)
          .then((result) => {
            const user = JSON.stringify(result.data.user);
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
            localStorage.removeItem("user");
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("expires", result.data.validTo);
            localStorage.setItem("user", user);
            this.$router.push("/home");
            this.loading = false;

            
          })
          .catch(() => {
            this.error = true;
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
            localStorage.removeItem("user");
            this.loading = false;
            setTimeout(() => (this.error = false), 3000);
          });
      }
    },
  },
};
</script>

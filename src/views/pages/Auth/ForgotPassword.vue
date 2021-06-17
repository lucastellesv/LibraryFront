<template>
  <v-container id="auth" class="fill-height justify-center">
    <v-stepper v-model="step" class="pa-5" style="width: 800px">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Digite seu e-mail
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          Código de Verificação
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 3" step="3">
          Atualizar
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 4" step="4">
          Completo
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-slide-y-transition appear>
            <p class="text-center" style="font-size: 1.2rem">
              Insira o e-mail cadastrado na sua conta!
              <br />
              Vamos te enviar um código para recuperação da sua senha.
            </p>
          </v-slide-y-transition>

          <v-slide-y-transition appear>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                color="info"
                label="E-mail..."
                prepend-icon="mdi-email"
                required
              />
            </v-form>
          </v-slide-y-transition>

          <div class="text-right mt-5">
            <v-btn
              color="info"
              rounded
              @click="sendEmail"
              :loading="loading"
              :disabled="!valid"
            >
              Enviar e-mail
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-slide-y-transition appear>
            <p class="text-center" style="font-size: 1.2rem">
              Insira o código de recuperação que enviamos para o seu E-mail.
            </p>
          </v-slide-y-transition>

          <v-slide-y-transition appear>
            <v-form ref="secondForm" lazy-validation>
              <v-text-field
                @keydown.space.prevent
                color="#197DFF"
                :rules="[(v) => !!v || 'Pin requerido']"
                label="Código"
                v-model="pin"
                prepend-icon="mdi-account"
              />
            </v-form>
          </v-slide-y-transition>

          <div class="text-right mt-5">
            <v-btn color="info" rounded @click="validatePin" :loading="loading">
              Validar
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form ref="thirdForm">
            <v-text-field
              v-model="newPassword"
              :rules="[
                (v) =>
                  v.length > 5 || 'A senha deve ter no mínimo 5 caracteres',
              ]"
              type="password"
              label="Nova Senha"
              required
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              :rules="[(v) => v == newPassword || 'As senhas não batem']"
              label="Confirme a Senha"
              type="password"
              required
            ></v-text-field>
          </v-form>

          <div class="text-right mt-5">
            <v-btn color="info" rounded @click="update" :loading="loading">
              Atualizar
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <p class="text-center" style="font-size: 1.2rem">
            Sua senha foi atualizada com sucesso!
          </p>

          <div class="text-center mt-5">
            <v-btn color="info" rounded @click="toLogin" :loading="loading">
              Ir para Login
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<style scoped>
#auth {
  display: flex;
  align-items: center;
  justify-content: center;


  max-width: unset;
  height: 100vh;
}
</style>

<script>
import api from "../../../services/api";

export default {
  name: "Login",

  components: {},

  data: () => ({
    step: 1,
    loading: false,
    error: false,
    valid: false,
    pin: "",
    newPassword: "",
    confirmPassword: "",
    userId: "",
    email: "",
    emailRules: [
      (v) => !!v || "E-mail requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Senha requerida"],
  }),

  methods: {
    sendEmail() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        const user = {
          Email: this.email,
        };
        api
          .post("https://localhost:44310/User/forgot-password", user)
          .then((response) => {
            this.userId = response.data.userId;
            this.loading = false;
            this.step++;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },

    validatePin() {
      if (this.$refs.secondForm.validate()) {
        this.loading = true;

        const data = { Code: parseInt(this.pin), UserId: this.userId };

        api
          .post("https://localhost:44310/User/forgot-password/validate", data)
          .then(() => {
            this.loading = false;
            this.step++;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },

    update() {
      if (this.$refs.thirdForm.validate()) {
        this.loading = true;

        const data = {
          UserId: this.userId,
          NewPassword: this.newPassword,
          Code: parseInt(this.pin),
        };
        api
          .post("https://localhost:44310/User/forgot-password/reset", data)
          .then(() => {
            this.loading = false;
            this.step++;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },

    toLogin() {
      this.$router.push("/");
    },
  },
};
</script>

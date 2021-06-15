<template>
  <v-app>
    <v-container id="auth" class="fill-height">
      <v-card class="pa-5" elevation="10" >
        <v-tabs color="success" slider-size="none" fixed-tabs v-model="tabs">
          <v-tab>Login</v-tab>
          <v-tab>Registrar</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
          <v-tab-item :value="0">
            <Login />
          </v-tab-item>
          <v-tab-item :value="1">
            <Register @toLogin="tabs = 0" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
#auth {
  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff;
  max-width: unset;
}
</style>

<script>
import Login from "./Login";
import Register from "./Register";

export default {
  name: "Auth",

  data: () => ({
    tabs: null,
  }),

  components: {
    Login,
    Register,
  },
};
</script>

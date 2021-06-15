<template>
  <v-container class="background">
    <router-view />
  </v-container>
</template>

<style scoped>
.background {
  max-width: none;
}
</style>

<script>
export default {
  name: "NotAuthenticated",
};
</script>
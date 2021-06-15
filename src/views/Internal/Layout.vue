<template>
  <v-container class="background">
    <AppBar/>
    <router-view />
  </v-container>
</template>

<style scoped>
.background {
  max-width: none;
  background: #fff;
}
</style>

<script>
import AppBar from '../../components/AppBar.vue'
export default {
  name: "Authenticated",
  components:{
    AppBar
  }
};
</script>
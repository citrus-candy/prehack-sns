<template>
  <v-app-bar app v-show="loading">
    <v-toolbar-title>Prehack SNS</v-toolbar-title>
    <v-spacer></v-spacer>
    <sign-in-dialog />
    <sign-up-dialog />
    <vantajs-dialog />
  </v-app-bar>
</template>

<script>
import SignInDialog from "./SignInDialog.vue";
import SignUpDialog from "./SignUpDialog.vue";
import VantajsDialog from "./VantajsDialog.vue";

export default {
  components: { SignInDialog, SignUpDialog, VantajsDialog },
  data: () => ({
    loading: false
  }),
  mounted() {
    this.loading = true;
  }
};
</script>

<style scoped>
.v-app-bar {
  opacity: 0.7;
  transition-property: opacity;
}
.v-app-bar:hover {
  opacity: 0.9;
}
</style>

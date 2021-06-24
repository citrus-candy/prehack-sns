<template>
  <v-app-bar app>
    <v-toolbar-title>Prehack SNS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text color="primary" href="/" nuxt>
      <v-icon left>mdi-home</v-icon>
      ホーム
    </v-btn>
    <v-btn text color="primary">
      <v-icon left>mdi-login</v-icon>
      ログイン
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    linkTo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.layout {
  position: absolute;
  top: 10px;
  left: 20px;
}
</style>

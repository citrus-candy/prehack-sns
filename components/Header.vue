<template>
  <v-layout>
    <v-btn fab @click="linkTo('/')">
      <v-icon>mdi-sync</v-icon>
    </v-btn>
  </v-layout>
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

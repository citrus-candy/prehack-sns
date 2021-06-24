<template>
  <v-app>
    <v-vanta effect="rings" :options="options" />
    <Header />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VVanta from "../node_modules/vue-vanta/src/Vanta.vue";

export default {
  components: { VVanta },
  data() {
    return {
      options: {
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 977.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0
      }
    };
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

#app {
  background-color: rgb(32, 36, 40);
  max-height: 100vh;
  font-family: "cyrillic";
  overflow: hidden;
}

.container {
  min-height: 100%;
  display: flex;
  align-items: center;
}
</style>

<template>
  <v-bottom-navigation
    v-model="value"
    :background-color="color"
    dark
    shift
    absolute
  >
    <v-btn @click="linkTo('/')">
      <span>ホーム</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn @click="linkTo('/login')">
      <span>ログイン</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn disabled v-if="isLogin">
      ログインしています
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({ value: 0 }),
  methods: {
    linkTo(url) {
      this.$router.push(url);
    }
  },
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

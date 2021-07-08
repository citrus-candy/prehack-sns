<template>
  <v-menu offset-y>
    <template v-slot:activator="{ attrs, on }">
      <v-btn text color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-cog</v-icon>
        背景の変更
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in items" :key="item" link>
        <v-list-item-title
          v-text="item"
          @click="setVantaEffect(item)"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: ["rings", "net", "dots"]
  }),
  methods: {
    setVantaEffect(item) {
      this.$store.commit("setVantaEffect", item);
    }
  }
};
</script>

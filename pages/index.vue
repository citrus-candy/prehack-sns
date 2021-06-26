<template>
  <v-row class="flex-column">
    <v-col v-if="threadKey == ''">
      <ThreadTable />
    </v-col>
    <v-col v-else>
      <PostsList />
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    threadKey() {
      return this.$store.state.threadKey;
    }
  }
};
</script>

<style scoped>
.img {
  width: 54vw;
  margin: auto;
}
</style>

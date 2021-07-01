<template>
  <v-row class="flex-column">
    <v-col v-if="threadKey == ''">
      <ThreadTable />
    </v-col>
    <v-col v-else>
      <Posts />
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setPostStatus", "list");
  },
  computed: {
    threadKey() {
      return this.$store.state.threadKey;
    }
  }
};
</script>

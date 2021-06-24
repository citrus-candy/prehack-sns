<template>
  <v-row dense align="center">
    <v-col v-for="result in results" :key="result.key">
      <ThreadCard
        :thread_name="result.name"
        :thread_description="result.author.description"
        :thread_key="result.key"
      />
    </v-col>
    <v-col v-show="progress">
      <v-progress-circular
        class="circular"
        size="270"
        indeterminate
        color="white"
      >
        GET => Kashiwa Onigiri 🍙
      </v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    results: [],
    thread_names: [],
    progress: true
  }),
  created() {
    this.listThread();
  },
  methods: {
    async listThread() {
      let url = "https://t9f823.deta.dev/api/v1/threads";
      axios
        .get(url)
        .then(response => {
          this.results = response.data;
          this.progress = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.row {
  max-width: max-content;
  margin: auto;
}
.circular {
  width: fit-content;
}
</style>

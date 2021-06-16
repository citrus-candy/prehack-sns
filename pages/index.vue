<template>
  <v-container>
    <v-row>
      <v-col v-for="result in results" :key="result.key">
        <ThreadCard
          :thread_name="result.name"
          :thread_description="result.author.description"
          :thread_key="result.key"
        />
      </v-col>
      <v-col v-show="progress">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
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
        .get(url, {
          params: {
            limit: 4,
            page: 1
          }
        })
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

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-height: 94vh;
  padding: 68px 0px;
}
</style>

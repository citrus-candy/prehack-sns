<template>
  <v-row dense align="center">
    <v-col v-for="result in results" :key="result.key" v-show="!progress">
      <ThreadCard
        :thread_name="result.name"
        :thread_description="result.author.description"
        :thread_key="result.key"
      />
    </v-col>
    <v-col>
      <v-progress-circular
        class="circular"
        size="270"
        indeterminate
        color="white"
        v-show="progress"
      >
        GET => Kashiwa Onigiri 🍙
      </v-progress-circular>
    </v-col>
    <transition name="fade">
      <div class="bg" v-show="progress"></div>
    </transition>
    <v-row class="btnContainer">
      <v-col>
        <v-btn fab color="primary" @click="listThread()">
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <create-thread-dialog @list-thread="listThread" />
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import axios from "axios";
import CreateThreadDialog from "./CreateThreadDialog.vue";

export default {
  components: { CreateThreadDialog },
  data: () => ({
    results: [],
    thread_names: [],
    progress: true
  }),
  mounted() {
    this.$store.commit("setThreadKey", "");
    this.listThread();
  },
  methods: {
    async listThread() {
      let url = "https://t9f823.deta.dev/api/v1/threads";
      this.progress = true;
      await axios
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
  z-index: 6;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(32, 36, 40);
  z-index: 5;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}
.btnContainer {
  position: absolute;
  top: 30px;
  left: 30px;
}
.v-btn {
  opacity: 0.7;
  transition-property: opacity;
}
.v-btn:hover {
  opacity: 0.9;
}
</style>

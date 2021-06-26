<template>
  <v-hover v-slot="{ hover }">
    <v-card
      @click="setThreadKey()"
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      nuxt
    >
      <v-img :src="imgUrl" height="200" width="400"></v-img>
      <v-card-title id="left">
        {{ thread_name }}
      </v-card-title>
      <v-card-subtitle>
        {{ thread_description }}
      </v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    thread_name: String,
    thread_description: String,
    thread_key: String
  },
  data: () => ({
    progress: true,
    imgUrl: "",
    imgArray: [],
    imgArrayLength: 143
  }),
  methods: {
    setThreadKey() {
      console.log("ThreadKey:" + this.thread_key);
      this.$store.commit("setThreadKey", this.thread_key);
    }
  },
  created() {
    for (let i = 1; i < this.imgArrayLength; i++) {
      this.imgArray.push(i);
    }
    let imgNumber = Math.floor(Math.random() * this.imgArray.length);
    this.imgUrl =
      "https://www.beiz.jp/images_P/pastel/pastel_00" +
      ("000" + imgNumber).slice(-3) +
      ".jpg";
  }
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  width: fit-content;
  margin: auto;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

#right {
  margin-right: 15px;
}
</style>

<template>
  <v-row class="comment flex-column">
    <div v-for="content in contents" :key="content[2]">
      <v-col>
        <h1 :style="{ left: `${Math.random() * 500}px` }">
          {{ content[3] }}wwww
        </h1>
      </v-col>
    </div>
    <v-col v-show="progress">
      <div class="circular">
        <v-progress-circular size="270" indeterminate color="white">
          GET => Kashiwa Onigiri 🍙
        </v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    contents: Array,
    isLogin: Boolean,
    userKey: String,
    progress: Boolean,
    btnLoading: Boolean
  },
  data: () => ({
    left: 0
  }),
  methods: {
    deletePost(key) {
      this.$emit("delete-post", key);
    },
    animation() {
      this.$anime({
        targets: "h1",
        loop: true,
        translateX: [screen.width, -screen.width - 1000],
        easing: "linear",
        duration: function(el, i, l) {
          return Math.random() * 10000 + 10000;
        }
      });
    }
  },
  mounted() {
    this.animation();
  },
  updated() {
    this.animation();
  }
};
</script>

<style scoped>
.comment {
  color: white;
}
.row {
  height: 80vh;
}
.v-move {
  transition: all 1000ms;
}
h1 {
  position: relative;
}
.btnDelete {
  top: 5px;
}
.circular {
  height: inherit;
}
</style>

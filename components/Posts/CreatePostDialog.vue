<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    nudge-left="70px"
    nudge-bottom="10px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab color="red" v-bind="attrs" v-on="on" v-show="isLogin">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-snackbar
        max-width="220px"
        min-width="180px"
        v-model="snackCreateThread"
        absolute
        left
      >
        投稿しました
      </v-snackbar>
    </template>
    <v-card elevation="2">
      <v-form v-model="valid">
        <v-card-text>
          <v-textarea
            v-model="content"
            label="いまなにしてるん？"
            required
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="action">
          <v-btn
            elevation="2"
            @click="createPost()"
            color="primary"
            :loading="btnLoading"
            :disabled="content == ''"
          >
            投稿
          </v-btn>
        </v-card-actions>
        <v-card-text v-show="errorFlag">
          <div class="wrong_text">エラー：{{ errorText }}</div>
        </v-card-text>
      </v-form>
    </v-card>
  </v-menu>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    menu: false,
    valid: false,
    content: "",
    errorFlag: false,
    errorText: "",
    btnLoading: false,
    snackCreateThread: false
  }),
  methods: {
    async createPost() {
      let url = "https://t9f823.deta.dev/api/v1/posts";
      let Authorization = `Bearer ${this.$store.state.token}`;
      this.btnLoading = true;
      this.errorFlag = false;
      await axios
        .post(
          url,
          {
            thread_key: this.$store.state.threadKey,
            content: this.content
          },
          {
            headers: { "jwt-token": Authorization }
          }
        )
        .then(response => {
          // console.log(response.data);
          this.btnLoading = false;
          this.menu = false;
          this.snackCreateThread = true;
          this.$emit("list-posts");
        })
        .catch(error => {
          console.log(error.response);
          this.errorText = error.response.data.detail;
          this.errorFlag = true;
          this.btnLoading = false;
        });
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style scoped>
.action {
  justify-content: center;
}
.v-card {
  margin: auto;
}
.wrong_text {
  color: red;
}
.v-snack {
  top: 66px;
}
</style>

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
      <v-snackbar class="snack" v-model="snackCreateThread" absolute left>
        スレッドを作成しました
      </v-snackbar>
    </template>
    <v-card elevation="2">
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field
            v-model="name"
            label="スレッド名"
            required
            append-icon="mdi-pencil"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="action">
          <v-btn
            elevation="2"
            @click="createThread()"
            color="primary"
            :loading="btnLoading"
            :disabled="name == ''"
          >
            作成
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
    name: "",
    errorFlag: false,
    errorText: "",
    btnLoading: false,
    snackCreateThread: false
  }),
  methods: {
    // testdata => email: hogehoge@fuga.com passeword: hogehogefuga
    async createThread() {
      let url = "https://t9f823.deta.dev/api/v1/threads";
      let Authorization = `Bearer ${this.$store.state.token}`;
      this.btnLoading = true;
      this.errorFlag = false;
      axios
        .post(
          url,
          {
            name: this.name
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
          this.$emit("list-thread");
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
.snack {
  top: 66px;
}
</style>

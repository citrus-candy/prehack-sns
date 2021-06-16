<template>
  <v-card elevation="2" width="20vw">
    <v-card-text>
      <v-form v-model="valid">
        <v-row class="flex-column">
          <v-col>
            <div class="text-h6">
              ログイン・ログアウト
            </div>
          </v-col>
          <v-col cols="auto">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="メールアドレス"
              required
              append-icon="mdi-email"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="パスワード"
              required
              append-icon="mdi-key"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              elevation="2"
              @click="signin()"
              color="success"
              :loading="btn_loading"
            >
              ログイン
            </v-btn>
          </v-col>
          <v-col>
            <v-btn elevation="2" @click="logOut()" color="error" v-if="isLogin">
              ログアウト
            </v-btn>
          </v-col>
          <v-col>
            <div v-if="error_flag" class="wrong_text">
              エラー：{{ error_text }}
            </div>
            <div v-if="success_flag" class="success_text">
              {{ msg }}に成功しました
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "メールアドレスは必須です",
      v => /.+@.+/.test(v) || "メールアドレスの形式が違います"
    ],
    password: "",
    passwordRules: [v => !!v || "パスワードは必須です"],
    error_flag: false,
    success_flag: false,
    btn_loading: false,
    msg: ""
  }),
  methods: {
    // testdata => email: hogehoge@fuga.com passeword: hogehogefuga
    async signin() {
      let url = "https://t9f823.deta.dev/api/v1/auth/signin";
      this.btn_loading = true;
      this.error_flag = false;
      this.success_flag = false;
      axios
        .post(url, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          this.success_flag = true;
          this.btn_loading = false;
          this.msg = "ログイン";
          this.$store.commit("setIsLogin", true);
          this.$store.commit("setToken", response.data.jwt);
        })
        .catch(error => {
          console.log(error.response);
          this.error_text = error.response.data.detail;
          this.error_flag = true;
          this.btn_loading = false;
        });
    },
    logOut() {
      this.$store.commit("setIsLogin", false);
      this.$store.commit("setToken", "");
      this.msg = "ログアウト";
      this.success_flag = true;
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    token() {
      return this.$store.state.token;
    }
  }
};
</script>

<style scoped>
.v-card {
  margin: auto;
}
.wrong_text {
  color: red;
}
.success_text {
  color: green;
}
</style>

<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-login</v-icon>
        ログイン
      </v-btn>
    </template>
    <v-card elevation="2">
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            clearable
            required
            append-icon="mdi-email"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="パスワード"
            clearable
            required
            append-icon="mdi-key"
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="action">
          <v-btn
            elevation="2"
            @click="signin()"
            color="success"
            :loading="btn_loading"
          >
            ログイン
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <div v-if="error_flag" class="wrong_text">
            エラー：{{ error_text }}
          </div>
          <div v-if="success_flag" class="success_text">
            {{ msg }}に成功しました
          </div>
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
.action {
  justify-content: center;
}
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

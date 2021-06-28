<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="!isLogin" text color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-login</v-icon>
        ログイン
      </v-btn>
      <v-btn v-else text color="primary" @click="logOut()">
        <v-icon left>mdi-logout</v-icon>
        ログアウト
      </v-btn>
      <v-btn class="userName" text>
        {{ userName }}
      </v-btn>
      <v-snackbar class="snack" v-model="snackLogin" absolute right>
        ログインに成功しました
      </v-snackbar>
      <v-snackbar class="snack" v-model="snackLogout" absolute right>
        ログアウトに成功しました
      </v-snackbar>
    </template>

    <v-card elevation="2">
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
            append-icon="mdi-email"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="パスワード"
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
            :loading="btnLoading"
          >
            ログイン
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <div v-if="errorFlag" class="wrong_text">エラー：{{ errorText }}</div>
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
    errorFlag: false,
    errorText: "",
    btnLoading: false,
    snackLogin: false,
    snackLogout: false
  }),
  methods: {
    // testdata => email: hogehoge@fuga.com passeword: hogehogefuga
    async signin() {
      let url = "https://t9f823.deta.dev/api/v1/auth/signin";
      this.btnLoading = true;
      this.errorFlag = false;
      axios
        .post(url, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          this.btnLoading = false;
          this.menu = false;
          this.snackLogin = true;
          this.$store.commit("setIsLogin", true);
          this.$store.commit("setToken", response.data.jwt);
          this.userInfo();
        })
        .catch(error => {
          console.log(error.response);
          this.errorText = error.response.data.detail;
          this.errorFlag = true;
          this.btnLoading = false;
        });
    },
    async userInfo() {
      let url = "https://t9f823.deta.dev/api/v1/users/me";
      let Authorization = `Bearer ${this.$store.state.token}`;
      axios
        .get(url, {
          headers: { "jwt-token": Authorization }
        })
        .then(response => {
          console.log(response.data);
          this.$store.commit("setUserKey", response.data.key);
          this.$store.commit("setUserName", response.data.name);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    logOut() {
      this.$store.commit("setIsLogin", false);
      this.$store.commit("setToken", "");
      this.snackLogout = true;
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userName() {
      return this.$store.state.userName;
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
.userName {
  color: black !important;
  pointer-events: none;
}
.wrong_text {
  color: red;
}
.success_text {
  color: green;
}
.snack {
  top: 66px;
}
</style>

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
        <v-icon left>mdi-account-plus</v-icon>
        ユーザー登録
      </v-btn>
    </template>
    <v-card elevation="2">
      <v-form v-model="valid">
        <v-card-text>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="ユーザー名"
            required
            append-icon="mdi-pencil"
          ></v-text-field>
        </v-card-text>
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
        <v-card-text>
          <v-text-field
            v-model="description"
            label="説明（任意）"
            clearable
            append-icon="mdi-account-details"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="action">
          <v-btn
            elevation="2"
            @click="signup()"
            color="primary"
            :loading="btn_loading"
          >
            サインアップ
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <div v-if="error_flag" class="wrong_text">
            エラー：{{ error_text }}
          </div>
          <div v-if="success_flag" class="success_text">
            ユーザー登録に成功しました
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
    name: "",
    nameRules: [v => !!v || "ユーザー名は必須です"],
    email: "",
    emailRules: [
      v => !!v || "メールアドレスは必須です",
      v => /.+@.+/.test(v) || "メールアドレスの形式が違います"
    ],
    password: "",
    passwordRules: [v => !!v || "パスワードは必須です"],
    description: "",
    error_flag: false,
    error_text: "",
    success_flag: false,
    success_text: "",
    btn_loading: false
  }),
  methods: {
    async signup() {
      let url = "https://t9f823.deta.dev/api/v1/auth/signup";
      this.btn_loading = true;
      this.success_flag = false;
      this.error_flag = false;
      axios
        .post(url, {
          name: this.name,
          email: this.email,
          password: this.password,
          description: this.description
        })
        .then(response => {
          console.log(response.status);
          this.success_flag = true;
          this.btn_loading = false;
        })
        .catch(error => {
          console.log(error.response);
          this.error_text = error.response.data.detail;
          this.error_flag = true;
          this.btn_loading = false;
        });
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

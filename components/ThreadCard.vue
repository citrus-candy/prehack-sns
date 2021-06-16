<template>
  <v-card
    min-height="80vh"
    max-height="80vh"
    min-width="20vw"
    color="blue lighten-4"
  >
    <div class="header_content">
      <v-card-title id="left">
        {{ thread_name }}
      </v-card-title>
      <v-chip id="right">{{ thread_description }}</v-chip>
    </div>
    <v-card-text>
      <v-list color="blue lighten-5" max-height="69vh" elevation="5">
        <v-row class="flex-column" overflow-auto>
          <v-col v-for="content in contents" :key="content.key">
            <v-list-item>
              <div class="card_content">
                <div class="name">{{ content[0] }}</div>
                <div class="text-h6 text_content">{{ content[1] }}</div>
              </div>
            </v-list-item>
            <v-divider></v-divider>
          </v-col>
          <v-col v-show="progress">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-list>
    </v-card-text>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="pink"
          fab
          dark
          absolute
          bottom
          right
          v-bind="attrs"
          v-on="on"
          v-if="isLogin"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ thread_name }}に投稿
        </v-card-title>

        <v-card-text>
          <v-textarea
            name="input"
            auto-grow
            v-model="post_content"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="createPosts()"
            :loading="btn_loading"
          >
            投稿
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    thread_name: String,
    thread_description: String,
    thread_key: String
  },
  data: () => ({
    contents: [],
    dialog: false,
    post_content: "",
    btn_loading: false,
    progress: true
  }),
  created() {
    this.listPosts();
  },
  methods: {
    async listPosts() {
      let url =
        "https://t9f823.deta.dev/api/v1/threads/" + this.thread_key + "/posts";
      axios
        .get(
          url,
          {
            params: {
              limit: 99,
              page: 1
            }
          },
          {
            headers: { "Access-Control-Allow-Origin": "*" }
          }
        )
        .then(response => {
          response.data.forEach(e => {
            this.contents.push([e.author.name, e.content]);
          });
          this.progress = false;
          console.log(this.contents);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async createPosts() {
      let url = "https://t9f823.deta.dev/api/v1/posts/";
      let Authorization = `Bearer ${this.$store.state.token}`;
      //this.btn_loading = true;
      console.log("token:" + this.$store.state.token);
      axios
        .post(
          url,
          {
            thread_key: this.thread_key,
            content: this.post_content
          },
          {
            headers: { "jwt-token": Authorization }
          }
        )
        .then(response => {
          console.log(response.data);
          this.post_content = "";
          this.dialog = false;
          this.btn_loading = false;
          this.listPosts();
        })
        .catch(error => {
          console.log(error.response);
        });
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
.card_content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.header_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#right {
  margin-right: 15px;
}
.name {
  padding-bottom: 10px;
}
.v-list {
  overflow-x: hidden;
}
.text_content {
  text-align: initial;
}
</style>

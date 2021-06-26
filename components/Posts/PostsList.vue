<template>
  <v-card height="75vh" width="50vw">
    <v-list-item v-for="content in contents" :key="content.key">
      <v-list-item-content>
        <v-list-item-subtitle>{{ content[0] }}</v-list-item-subtitle>
        <v-list-item-title>
          <div>{{ content[1] }}</div>
          <v-list-item-subtitle class="itemDate">
            {{ content[2] }}
          </v-list-item-subtitle>
        </v-list-item-title>
        <v-divider></v-divider>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    contents: [],
    dialog: false,
    post_content: "",
    btn_loading: false,
    progress: true
  }),
  mounted() {
    this.listPosts();
  },
  methods: {
    async listPosts() {
      this.contents = [];
      console.log("storeThreadKey:" + this.$store.state.threadKey);
      let url =
        "https://t9f823.deta.dev/api/v1/threads/" +
        this.$store.state.threadKey +
        "/posts";
      axios
        .get(url, {
          params: {
            limit: 99,
            page: 1
          }
        })
        .then(response => {
          response.data.forEach(e => {
            const date = new Date(0);
            date.setUTCSeconds(e.created_at);
            this.contents.push([
              e.author.name,
              e.content,
              this.dateFormat(date, "YYYY/MM/DD HH:MM:SS")
            ]);
          });
          console.log(this.contents);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async createPosts() {
      let url = "https://t9f823.deta.dev/api/v1/posts/";
      let Authorization = `Bearer ${this.$store.state.token}`;
      axios
        .post(
          url,
          {
            thread_key: this.$store.state.threadKey,
            content: this.post_content
          },
          {
            headers: { "jwt-token": Authorization }
          }
        )
        .then(response => {
          console.log(response.data);
          this.listPosts();
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    dateFormat(date, format) {
      format = format.replace(/YYYY/, date.getFullYear());
      format = format.replace(/MM/, date.getMonth() + 1);
      format = format.replace(/DD/, date.getDate());
      format = format.replace(/HH/, date.getHours());
      format = format.replace(/MM/, ("0" + date.getMinutes()).slice(-2));
      format = format.replace(/SS/, ("0" + date.getSeconds()).slice(-2));

      return format;
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
  overflow-y: scroll;
}
.v-list-item__title {
  display: flex;
}
.itemDate {
  text-align: right;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 2px #777;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
  box-shadow: none;
}
</style>

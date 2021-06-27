<template>
  <v-row>
    <v-col>
      <v-card height="75vh" width="50vw" dark>
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
        <v-list-item v-show="progress" class="circular">
          <v-list-item-content>
            <v-progress-circular size="270" indeterminate color="white">
              GET => Kashiwa Onigiri 🍙
            </v-progress-circular>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <div class="btnContainer">
      <v-btn fab color="cyan" @click="setThreadKey()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab color="primary" @click="listPosts()">
        <v-icon>mdi-sync</v-icon>
      </v-btn>
      <create-post-dialog @list-posts="listPosts" />
    </div>
  </v-row>
</template>

<script>
import axios from "axios";
import CreatePostDialog from "./CreatePostDialog.vue";

export default {
  components: { CreatePostDialog },
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
      this.progress = true;
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
    setThreadKey() {
      console.log("ThreadKey:" + this.thread_key);
      this.$store.commit("setThreadKey", "");
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
.circular {
  height: inherit;
}
.itemDate {
  text-align: right;
}
.btnContainer {
  position: absolute;
  top: 30px;
  left: 30px;
}
.v-btn {
  margin: 0px 5px;
  opacity: 0.7;
  transition-property: opacity;
}
.v-btn:hover {
  opacity: 0.9;
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

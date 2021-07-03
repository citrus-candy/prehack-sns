<template>
  <v-row>
    <v-col>
      <PostsList
        :contents="contents"
        :isLogin="isLogin"
        :userKey="userKey"
        :progress="progress"
        :btnLoading="btnLoading"
        @delete-post="deletePost"
        v-show="postStatus == 'list'"
      />
      <PostsTimeline
        :contents="contents"
        :isLogin="isLogin"
        :userKey="userKey"
        :progress="progress"
        :btnLoading="btnLoading"
        @delete-post="deletePost"
        v-show="postStatus == 'timeline'"
      />
      <PostsComment
        :contents="contents"
        :isLogin="isLogin"
        :userKey="userKey"
        :progress="progress"
        :btnLoading="btnLoading"
        @delete-post="deletePost"
        v-show="postStatus == 'comment'"
      />
    </v-col>
    <v-row class="btnContainer" id="left">
      <v-col>
        <v-btn fab color="cyan" @click="setThreadKey()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn fab color="primary" @click="listPosts()">
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <create-post-dialog @list-posts="listPosts" />
      </v-col>
    </v-row>
    <v-row class="btnContainer flex-column" id="right">
      <v-col>
        <v-btn fab color="orange" @click="setPostStatus('list')">
          <v-icon>mdi-card-text-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn fab color="pink" @click="setPostStatus('timeline')">
          <v-icon>mdi-timeline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn fab color="white" @click="setPostStatus('comment')">
          <v-icon>mdi-chat-processing</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackDelete" absolute bottom>
      投稿を削除しました
    </v-snackbar>
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
    progress: true,
    snackDelete: false,
    btnLoading: false
  }),
  mounted() {
    this.listPosts();
  },
  methods: {
    async listPosts() {
      this.contents = [];
      this.progress = true;
      // console.log("storeThreadKey:" + this.$store.state.threadKey);
      let url =
        "https://t9f823.deta.dev/api/v1/threads/" +
        this.$store.state.threadKey +
        "/posts";
      await axios
        .get(url, {
          params: {
            limit: 99,
            page: 1
          }
        })
        .then(response => {
          // console.log(response.data);
          response.data.forEach(e => {
            const date = new Date(0);
            date.setUTCSeconds(e.created_at);
            this.contents.push([
              e.author.key,
              e.author.name,
              e.key,
              e.content,
              this.dateFormat(date, "YYYY/MM/DD HH:MM:SS")
            ]);
          });
          this.progress = false;
          // console.log(this.contents);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async createPosts() {
      let url = "https://t9f823.deta.dev/api/v1/posts/";
      let Authorization = `Bearer ${this.$store.state.token}`;
      await axios
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
          // console.log(response.data);
          this.listPosts();
        })
        .catch(error => {
          // console.log(error.response);
        });
    },
    async deletePost(post_key) {
      let url = "https://t9f823.deta.dev/api/v1/posts/" + post_key;
      let Authorization = `Bearer ${this.$store.state.token}`;
      this.btnLoading = true;
      // console.log(post_key, Authorization);
      await axios
        .delete(url, {
          data: {
            post_key: post_key
          },
          headers: { "jwt-token": Authorization }
        })
        .then(response => {
          // console.log(response.data);
          this.listPosts();
          this.snackDelete = true;
          this.btnLoading = false;
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
    },
    setThreadKey() {
      this.$store.commit("setThreadKey", "");
    },
    setPostStatus(status) {
      this.$store.commit("setPostStatus", status);
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    token() {
      return this.$store.state.token;
    },
    userKey() {
      return this.$store.state.userKey;
    },
    postStatus() {
      return this.$store.state.postStatus;
    }
  }
};
</script>

<style scoped>
.btnContainer {
  top: 80px;
  position: fixed;
}
.btnContainer#left {
  left: 30px;
}
.btnContainer#right {
  right: 30px;
}
.v-btn {
  opacity: 0.7;
  transition-property: opacity;
}
.v-btn:hover {
  opacity: 0.9;
}
</style>

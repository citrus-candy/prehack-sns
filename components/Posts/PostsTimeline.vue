<template>
  <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
    <v-timeline-item v-for="content in contents" :key="content.key">
      <v-card>
        <v-card-subtitle>{{ content[1] }}</v-card-subtitle>
        <v-card-title>
          <div>
            {{ content[3] }}
            <v-btn
              v-show="isLogin && content[0] == userKey"
              class="btnDelete"
              icon
              color="red"
              @click="deletePost(content[2])"
              absolute
              right
              top
              :loading="btnLoading"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
          <v-list-item-subtitle class="itemDate">
            {{ content[4] }}
          </v-list-item-subtitle>
        </v-card-title>
        <v-divider></v-divider>
      </v-card>
    </v-timeline-item>
    <v-list-item v-show="progress" class="circular">
      <v-list-item-content>
        <v-progress-circular size="270" indeterminate color="white">
          GET => Kashiwa Onigiri 🍙
        </v-progress-circular>
      </v-list-item-content>
    </v-list-item>
  </v-timeline>
</template>

<script>
export default {
  props: {
    contents: Array,
    isLogin: Boolean,
    userKey: String,
    progress: Boolean,
    btnLoading: Boolean
  },
  methods: {
    deletePost(key) {
      this.$emit("delete-post", key);
    }
  }
};
</script>

<style scoped>
.v-card__title {
  display: flex;
}
.btnDelete {
  top: 5px;
}
.circular {
  height: inherit;
}
.itemDate {
  text-align: right;
}
</style>

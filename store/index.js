export const state = () => ({
  isLogin: false,
  userKey: "",
  userName: "",
  token: "",
  threadKey: ""
});

export const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
  setUserKey(state, userKey) {
    state.userKey = userKey;
  },
  setUserName(state, userName) {
    state.userName = userName;
  },
  setToken(state, token) {
    state.token = token;
  },
  setThreadKey(state, threadKey) {
    state.threadKey = threadKey;
  }
};

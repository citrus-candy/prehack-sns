export const state = () => ({
  isLogin: false,
  token: "",
  threadKey: ""
});

export const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
  setToken(state, token) {
    state.token = token;
  },
  setThreadKey(state, threadKey) {
    state.threadKey = threadKey;
  }
};

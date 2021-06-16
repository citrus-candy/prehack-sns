export const state = () => ({
  isLogin: false,
  token: ""
});

export const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
  setToken(state, token) {
    state.token = token;
  }
};

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    LOGIN_USER: (state, user) => {
      state.user = user;
    },
    LOGOUT_USER: (state) => {
      state.user = {}
    }
  },
  actions: {
    loginUser: (context, payload) => {
      context.commit("LOGIN_USER", payload);
    },
    async logoutUser (context, payload) {
      await this.$axios.post('/logout');
      localStorage.removeItem("token");
      context.commit('LOGOUT_USER');
      location.reload();
    }
  },
  getters: {
    userIsLogged: ({ user }) => {
      return (Object.keys(user).length === 0 && user.constructor === Object) === false;
    }
  }
};
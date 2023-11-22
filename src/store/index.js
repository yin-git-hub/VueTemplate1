import { createStore } from 'vuex'

const MEMBER_KEY = "MEMBER";

export default createStore({
  state: {
    member: JSON.parse(window.sessionStorage.getItem(MEMBER_KEY)) || {},
    token: {}
  },
  getters: {
  },
  mutations: {
    setMember (state, _member) {
      state.member = _member;
      window.sessionStorage.setItem(MEMBER_KEY, JSON.stringify(_member));
    },
    setToken (state,_token){
      state.token = _token;
      localStorage.setItem('token', _token);

    }
  },
  actions: {
  },
  modules: {
  }
})

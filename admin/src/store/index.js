import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";


export default createStore({
  state: {
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {}
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    paths: ["isCollapsed", "userInfo"] // 控制是否持久化
  })],
})


import $U from "../utils";
//基础数据
const app = {
  state: {
    hideMenu: '',
    hideMenu:false,
  },
  getters: {
    theme: state => state.theme,
    hideMenu: state => state.hideMenu,
  },
  mutations: {
    theme(state, payload) { state.theme = payload },
    hideMenu(state, payload) { state.hideMenu = payload },
  }
}

export default app

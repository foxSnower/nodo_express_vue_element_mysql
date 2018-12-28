import $U from "../utils";
//基础数据
const app = {
  state: {
    theme: '',
  },
  getters: {
    theme: state => state.theme,
  },
  mutations: {
    theme(state, payload) { state.theme = payload },
  }
}

export default app

import { createStore } from 'vuex'
import mutations from './mutations'
import getters from "./getters";
import actions from "./actions";

const store = createStore({
  state(){
    return {
      postlist: [],
      text: '',
      content: '',
      editT: '',
      editC: '',
      editCA: '',
      editD: '',
      id: '',
    }
  },
  mutations,
  getters,
  actions,
})

export default store
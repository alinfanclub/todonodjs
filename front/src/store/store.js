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
      loading: false,
      nodata: false
    }
  },
  mutations,
  getters,
  actions,
})

export default store
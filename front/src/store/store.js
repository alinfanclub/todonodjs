import { createStore } from 'vuex'
import mutation from './mutaition'
import getters from "./getters";
import actions from "./action";

const store = createStore({
  state(){
    return {
      state: {
        postlist: [],
      },
      mutation,
      getters,
      actions
    }
  },
})

export default store
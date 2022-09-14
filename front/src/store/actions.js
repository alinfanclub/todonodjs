import { fectchPostList, createPost} from "@/api/api.js"
import store from "@/store/store.js"
export default {
    async FETCH_POST_LIST({ commit }) {
        store.state.loading = true
        await fectchPostList()
          .then(
            ({ data }) => commit("SET_POST", data),
          )
          .catch(
            () => 
            store.state.nodata = true
            );
          store.state.loading = false
    },
    async CREATE_POST({ commit }, postData) {
        const { data } = await createPost(postData);
        commit("SET_TEXT", data);
    }
}
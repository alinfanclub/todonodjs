import { fectchPostList, createPost } from "@/api/api.js"
export default {
    FETCH_POST_LIST({ commit }) {
        fectchPostList()
          .then(({ data }) => commit("SET_POST", data,))
          .catch((error) => console.log(error));
    },
    async CREATE_POST({ commit }, postData) {
        const { data } = await createPost(postData);
        commit("SET_TEXT", data);
    }
}
import { fectchPostList } from "@/api/api"
export default {
    FETCH_POST_LIST({commit}, pageName) {
        fectchPostList(pageName)
        .then (({data})=> commit("SET_POST", data))
        .catch((error) => console.log(error));
            
    }
}
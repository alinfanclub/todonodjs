import axios from "axios";

const url = 'http://localhost:5000/api/posts/';

function fectchPostList() {
    return axios.get(`${url}/list.json`)
}

export {fectchPostList}
// class PostService {
//    // Get Poosts 
//     static getPosts() {
//         return new Promise(async (reslove, reject) => {
//             try {
//                 const res = await axios.get(url);
//                 const data = res.data;
//                 reslove(
//                     data.map(post => ({
//                         ...post,
//                         createdAt: new Date(post.createdAt)
//                     }))
//                 );
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     }

//    // Create Post
//     static insertPost(text) {
//         return axios.post(url, {
//             text
//         });
//     }

//    // Delet Post 
//     static deleatePost(id) {
//         return axios.delete(`${url}${id}`);
//     }
// }

// export default PostService;


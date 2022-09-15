# CRUD Project

## Vue.js 와 Node.js를 사용하여 메모, 글을 올리고 관리하는 서비스 개발

### 구현 목표

> 1. 포스트를 올리고, 삭제하고, 수정하는 것까지 구현
> 2. 작성시간, 수정시 수정할 시간 표시

### 구현 시 생긴 문제점
>
> 1. deleate(insertOne) / upload(uploadOne) 시 몽고디비의 objectId 를 가졍오는데 발생한 오류  
        BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer
        at new BSONTypeError (/Users/kimseounghun/node_modules/bson/lib/error.js:41:28)
        at new ObjectId (/Users/kimseounghun/node_modules/bson/lib/objectid.js:67:23)
        at /Users/kimseounghun/Desktop/dev/ALLVUE/todonodejs/baek/routes/api/posts.js:42:16
        at runMicrotasks (<anonymous>)
        at processTicksAndRejections (internal/process/task_queues.js:93:5)  
메세지가 나오면서 서버 통신 오류가 발생  

ex) nodejs

                    ```javascript  
                    
                    const express = require('express');
                    const mongodb = require('mongodb');

                    const router = express.Router();

                    // edit post

                    router.post('/edit/:id', async (req, res) => {
                    try {
                        const post = await loadPostCollection();
                        await post.updateOne(
                            { _id: new mongodb.ObjectId(req.params.id)},
                            {
                            $set: {
                                text: req.body.text,
                                content: req.body.content,
                                date: req.body.date,
                                createAt: new Date().toLocaleString(),
                                fix: true,
                            }
                            }
                        );
                        res.status(201).send();
                    } catch (error) {
                        console.log(error);
                    }
                    })

                    async function loadPostCollection() {
                        const client = await mongodb.MongoClient.connect('mongodb+srv://e759ksh:tkgl5012qq21@cluster0.bgjpc.mongodb.net/?retryWrites=true&w=majority', {
                            useNewUrlParser: true
                        });

                        return client.db('todoapp').collection('post')
                    }

                    module.exports = router;

                    
                    ```

ex) EditVue.vue 
```javascript


//actions.js
   async EDIT_POST({ commit }, postData) {
      const { data } = await editPost(postData);
      commit("SET_TEXT", data);
  }
// --------------------------- 
//api.js
function editPost(editData, id) {
    return axios.post(`${url}edit/${id}`, editData)
}
//----------------------------
// 모듈화 시도(실패)
methods: {
    editPost() {
        const editData = {
            text: this.title,
            content: this.content,
            date: this.date,
        };
    this.$store.dispatch("EDIT_POST", editData);
    }
}
// ---------------------------
//최종 EditVue.vue
 <template>
    <form  @submit.prevent="editPost(this.$store.state.id)">
        <div class="form-group">
          <label for="todo">시 등록하기</label>
          <input type="text" class="form-control" aria-describedby="" name="title" v-model="title" required >
          <input type="date" class="form-control" required v-model="date">
          <textarea v-model="content" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @keypress="enter">Submit</button>
      </form>
</template>

<script>
import {editPost} from "@/api/api.js"
export default {
  data() {
    return {
      title: this.$store.state.editT,
      content: this.$store.state.editC,
      date: this.$store.state.editD,
    }
  },
  methods: {
    async editPost(id) {
        try {
            const editData = {
                text: this.title,
                content: this.content,
                date: this.date,
            };
            await editPost(editData, id);
            this.$router.push("/");
        } catch (error) {
            console.log(error);
        }
    },
  },
}
</script>

```
ListVue.vue 에서 게시글의  제목, 생성날짜,  내용 등 포스트에 대한 데이터를 받아와 수정 버든을 누르면 수정이 되도록 하는데,
        disptch를 통해 store > actions > api 함수를 실행하는 모듈화를 진행하고자 했다.  
                 id값을 받아와서 actions 로 보낼때 문제가 생겨 id 값을 mongoose에서 String값으로 인식못하는 문제가 생겨 모듈화를 진행하지 않고 EditVue.vue 에서 api 함수를 불러와 @submit.prevent="editPost(this.$store.state.id)"을 통해 실행하도록 했다. 

this.$store.state.id" => ListVue.vue 에서 게시글 수정 버튼을 누를때 해당 포스트의 id를 포함한 정보를 store에서 저장해주었다. 


```javascript
    router.post('/edit/:id', async (req, res) => {
                    try {
                        const post = await loadPostCollection();
                        await post.updateOne(
                            { _id: new mongodb.ObjectId(req.params.id)},
                            {
                            $set: {
                                text: req.body.text,
                                content: req.body.content,
                                date: req.body.date,
                                createAt: new Date().toLocaleString(),
                                fix: true,
                            }
                            }
                        );
                        res.status(201).send();
                    } catch (error) {
                        console.log(error);
                    }
                    })
```
에서 { _id: new mongodb.ObjectId(req.params.id)} 부분의 req.params.id 는 api 함수에 
```javascript
function editPost(editData, id) {
    return axios.post(`${url}edit/${id}`, editData)
}
```
api 요청 http://localhost:8080/edit/:id 이다. api 요청때 :id 부분에 게시글의 _id 값을 보내도록 했으니 문제 없이 잘 요청 된듯 하다. 

실제로 모듈화를 진행했을때는 console 창에 http://localhost:8080/edit/[object : object] 식으로 잘못된 post 요청을 보냈다고 오류 메세지가 떳다.

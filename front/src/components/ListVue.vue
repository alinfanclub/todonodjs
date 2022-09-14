<template>
  <div>
    <SpinnerVue v-if="this.$store.state.loading == true"></SpinnerVue>
    <div>
      <ul>
        <li 
        v-for="(posts, index) in paginatedData" 
        :key="index"
        :item = "posts"
        :index = "index"
        class="postList"
        >
          <div>
            <div class="poemTitle">
              <div> 
                <div>{{posts.text}}</div>
                <span class="poemDate">{{posts.date}}</span>
              </div>
             <div>
               <button 
              @click="clicked =deleate(posts._id.toString())"
              class="closeBtn"  
              >
                  <ion-icon name="close-outline"></ion-icon>
              </button>
              <button 
                @click="editPost(
                  posts._id.toString(),
                  posts._id.toString(), 
                  posts.text, 
                  posts.content, 
                  posts.createAt, 
                  posts.date)"
                  class="editBtn"
                  >
                 <ion-icon name="pencil-sharp"></ion-icon>
              </button>
             </div>
            </div>
            <div class="poemContent">{{posts.content}}</div>
              <!-- <textarea v-model="posts.content" readonly class="form-control"></textarea>  -->
            <div class="createAt" v-if="posts.fix == false">게시글 작성: {{posts.createAt}}</div>
            <div class="createAt" v-else>게시글 수정: {{posts.createAt}}</div>
          </div>
        </li>
        <div v-if="this.$store.state.nodata == true" class="noData">  
            <p>정보를 불러오는데 실패했습니다.</p>
        </div>
        <div v-if="this.$store.state.postlist.length == 0 && this.$store.state.nodata == false" class="noData">  
            <p>데이터가 없습니다.</p>
        </div>
      </ul>
    </div>
    <div id="pagiNation">
      <button @click="backPage">prev</button>
        <button
          v-for="item in Math.ceil(this.$store.state.postlist.length / perPage)"
          :key="item"
          @click="() => goToPage(item)"
        >
        {{ item }}
      </button>
      <button @click="nextPage">next</button>
    </div>
  </div>
</template>

<script>
import store from "../store/store"
import {deleatePost} from "../api/api"
import handlePagination from "../handle/handlePagination";
import SpinnerVue from "./spinner/SpinnerVue.vue"
export default {
  data() {
    return {
      clicked: null,
      height: '',
      data: [],
    }
  },
  components: {
    SpinnerVue
  },
  setup() {
    const handlePaginationValue = handlePagination();
    return { ...handlePaginationValue };
  },
  computed: {
    posts: function() {
      return store.state.postlist.reverse();
    }
  },
  methods: {
    async deleate(id) {
      if(confirm("시를 삭제 한다구요??")) {
          try {
          await deleatePost(id)
        } catch (error) {
            console.log(error);
        }
        this.$store.dispatch("FETCH_POST_LIST");
      }
    },
    editPost(id, data, title, content, createAt, date) {
      this.$store.state.id = id
      this.$store.state.editT = title
      this.$store.state.editC = content
      this.$store.state.editCA =  createAt
      this.$store.state.editD = date
      this.$router.push("/edit/" + data)
    }
  },
  created() {
     this.$store.dispatch("FETCH_POST_LIST");
  }
}
</script>

<style scoped>
textarea {
  resize: none;
  width: 300px;
  height: 200px;
  outline: none;
  cursor:unset;
}
ul {
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
}
li {
  display: flex;
}
.noData {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
textarea.form-control {
  height: 200px;
  outline: none;
  border: 1px solid #9c9c9c;
  box-shadow: none;
  background-color: #fff;
}
.closeBtn, .editBtn {
  background-color: #fff;
  border: none;
}
.poemTitle {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.poemTitle > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.poemTitle > div span {
  margin-left: 50px;
}
.poemTitle ion-icon {
  font-size: 20px;
}
.poemTitle ion-icon:hover {
  background-color: #ddd;
}
.poemContent {
   white-space:pre;
}
.poemDate {
  font-size: .5rem;
  color: #ddd;
}
.createAt {
  width: 100%;
  text-align: right;
  color: #ddd;
  font-size: .5rem;
}
.postList {
  margin-bottom: 100px;

}
.postList > div:nth-child(1) {
  padding: 1rem;
  border: 1px dashed #eee;
  min-width: 500px;
}
#pagiNation {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px dashed #ddd;
}
#pagiNation button {
  border: none;
  min-width: 20px;
  padding: 5px;
  margin: 0 10px;
  background-color:transparent;
}
</style>
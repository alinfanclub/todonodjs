<template>
  <div>
   <div v-if="this.$store.state.postlist.length == 0">  
      <p>no data</p>
    </div>
    <div>
      <ul>
        <li 
        v-for="(posts, index) in this.$store.state.postlist" 
        :key="posts._id"
        :item = "posts"
        :index = "index"
        >
        <div>
          <div> {{posts.text}}</div>
            <textarea v-model="posts.content" readonly class="form-control"></textarea> 
            <small>{{posts.createAt}}</small>
        </div>
          <div>
            <button 
            @click="clicked =deleate(posts._id.toString())"
            class="closeBtn"  
            >
                <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {deleatePost} from "../api/api"
export default {
  data() {
    return {
      clicked: null,
      height: '',
    }
  },
  computed: {
    
  },
  methods: {
      async deleate(id) {
            try {
             await deleatePost(id)
            } catch (error) {
                console.log(error);
            }
            this.$store.dispatch("FETCH_POST_LIST");
        },
      taH () {
         const ta = document.querySelector("textarea");
         ta.scrollHeight = this.height;
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
li {
  display: flex;
}
textarea.form-control {
  height: 200px;
  outline: none;
  border: 1px solid #9c9c9c;
  box-shadow: none;
  background-color: #fff;
}
.closeBtn {
  background-color: #fff;
  border: none;
}
</style>
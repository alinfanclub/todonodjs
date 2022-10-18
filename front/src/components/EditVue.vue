<template>
     <div class="write-page">
      <form @submit.prevent="editPost(this.$store.state.id)" class="write-form">
      <div class="form-group">
        <h1 for="title">수정</h1>
        <div class="flex-label">
           <label for="title">제목</label>
          <input type="text" class="form-control" aria-describedby="" name="title" id="title" v-model="title" placeholder="제목을 입력해주세요" required>
        </div>
        <div class="flex-label">
          <label for="date">일자</label>
          <input type="date" class="form-control" id="date" v-model="date" data-placeholder="날짜를 입력해주세요" required >
        </div>
        <!-- <div class="flex-label">
          <label for="img">이미지</label>
          <input type="file">
        </div> -->
        <div class="flex-label">
          <label for="date">종류</label>
         <select class="w-100" v-model="selectType" required>
            <option value="" disabled>시 타입</option>
            <option value="자작 시">자작 시</option>
            <option value="가져온 시">가져온 시</option>
         </select>
        </div>
        <div class="flex-label top">
          <label for="textArea">내용</label>
          <textarea v-model="content" class="form-control" id="textArea" placeholder="두근두근 당신의 시는?" required></textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-primary submit-btn" @keypress="enter">Submit</button>
    </form>
  </div>
</template>

<script>
import {editPost} from "@/api/api.js"
export default {
  data() {
    return {
      id: this.$store.state.id,
      title: this.$store.state.editT,
      content: this.$store.state.editC,
      selectType: this.$store.state.selectType,
      date: this.$store.state.editD,
    }
  },
  methods: {
    async editPost(id) {
        try {
            const editData = {
                text: this.title,
                content: this.content,
                selectType: this.selectType,
                date: this.date,
            };
            await editPost(editData, id);
            this.$router.replace("/list/" + this.$route.params.id);
        } catch (error) {
            console.log(error);
        }
    },
  },
}
</script>

<style>
.write-form {
  position: relative;
}
.write-page {
  max-width: 1000px;
  margin:  0 auto;
}
.write-form h1 {
  font-size: 1.5rem;
  text-align: center;
  padding: 30px 0;
}
.flex-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.flex-label.top {
  align-items: flex-start;
}
.flex-label > label {
  min-width: fit-content;
  margin-right: 30px;
}
textarea {
  resize: none;
  width: 300px;
  height: 200px;
  outline: none;
  cursor:unset;
}
textarea.form-control {
  height: 600px;
}
.submit-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
input[type='date']::before {
  content: attr(data-placeholder);
  width: 100%;
}

input[type='date']:focus::before,
input[type='date']:valid::before {
  display: none;
}
</style>
<template>
  <div class="write-page">
      <form @submit.prevent="createPost" class="write-form">
      <div class="form-group">
        <h1 for="title">시 등록하기</h1>
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
export default {
  data() {
    return {
      title: '',
      content: '',
      date: "",
    }
  },
  methods: {
    async createPost() {
          try {
              const postData = {
                  text: this.title,
                  content: this.content,
                  date: this.date,
                  fix: false,
              };
              await this.$store.dispatch("CREATE_POST", postData);
              this.$router.push("/");
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
  height: 200px;
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
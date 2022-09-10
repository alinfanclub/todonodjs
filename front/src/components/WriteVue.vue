<template>
    <form  @submit.prevent="createPost">
        <div class="form-group">
          <label for="todo">할일</label>
          <input type="text" class="form-control" id="todo" aria-describedby="" name="title" v-model="title" required>
          <textarea v-model="content" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @keypress="enter">Submit</button>
      </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
     async createPost() {
            try {
                const postData = {
                    text: this.title,
                    content: this.content,
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
</style>
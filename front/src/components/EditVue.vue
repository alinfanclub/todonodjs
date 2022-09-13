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
      id: this.$store.state.id,
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
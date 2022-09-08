<template>
    <form action="/add" method="POST">
        <div class="form-group">
          <label for="todo">할일</label>
          <input type="text" class="form-control" id="todo" aria-describedby="" name="title">
        </div>
        <div class="form-group">
          <label for="due-date">Due date</label>
          <input type="date" class="form-control" id="due-date" name="date">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
</template>

<script>
export default {

}
</script>

<style>

</style>
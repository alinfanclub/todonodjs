<template>
  <div>
    1
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
     this.$store.dispatch("FETCH_POST_LIST");
  }
}
</script>

<style>

</style>
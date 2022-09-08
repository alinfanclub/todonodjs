<template>
   <div>
        <nav-area></nav-area>
        <router-view></router-view>
   </div>
</template>

<script>
import NavArea from './common/NavVue.vue'
export default {
    components: {
        NavArea,
    }
}
</script>

<style>

</style>
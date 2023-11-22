<script >
import {defineComponent} from "vue";
import TheHeaderView from "@/components/the-header.vue";
export default defineComponent({
  name:"the-main",
  components: {TheHeaderView},
})
</script>

<template>
  <the-header-view></the-header-view>
<!--  <the-sider-view></the-sider-view>-->
</template>

<style scoped>

</style>

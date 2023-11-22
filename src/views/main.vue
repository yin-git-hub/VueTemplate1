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
  <a-layout>
    <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>

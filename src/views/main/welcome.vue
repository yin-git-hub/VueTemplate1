<script setup>
import {defineComponent} from 'vue';

defineComponent({
  name: 'the-welcome', // 修改为新的组件名称
});
</script>

<template>
  <a-result
      status="success"
      title="欢迎回来！"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <template #extra>

    </template>
  </a-result>
</template>
<style scoped>

</style>

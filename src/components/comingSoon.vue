<script setup>
import {defineComponent} from 'vue'

  defineComponent({
  name: "the-comingSoon"
})
</script>


<template>
  <div class="coming-soon">
    <img class="image" src="../../public/static/oqn8.jpg" alt="Coming Soon" />
    <h1 class="title">敬请期待</h1>
    <p class="description">我们正在努力准备更多精彩内容，敬请期待！</p>
  </div>
</template>


<style scoped>
.coming-soon {
  text-align: center;
  padding: 20px;
}
.coming-soon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh; /* 设置容器的高度，可以根据实际情况调整 */
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #888;
}
</style>

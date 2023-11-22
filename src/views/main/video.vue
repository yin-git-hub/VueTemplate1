<script setup>
import {defineComponent} from 'vue'
import ComingSoon from "@/components/comingSoon.vue";
import axios from "axios";
// import axios from "axios";
axios.get("/water-sty/test1").then(response => {

  let data = response.data;
  console.log("time...")
  console.log(data)
});
defineComponent({
  name: "the-video"
})
</script>

<template>
  <coming-soon></coming-soon>

</template>

<style scoped>

</style>

<template>
  <a-radio-group v-model:value="size">
  </a-radio-group>
  <a-space direction="vertical">
    <a-select
        v-model:value="value1"
        :size="size"
        style="width: 200px"
        :options="options"
    ></a-select>

  </a-space>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: "the-selection",
  setup() {
    const popupScroll = () => {
      console.log('popupScroll');
    };
    return {
      popupScroll,
      size: ref('default'),
      value1: ref('a1'),
      value2: ref(['a1', 'b2']),
      value3: ref(['a1', 'b2']),
      options: [...Array(25)].map((_, i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
    };
  },
});
</script>

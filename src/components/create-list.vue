<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <spanc  class="icon-text">
        <EditOutlined style="color: white"></EditOutlined>
      </spanc>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <router-link to="to">

          </router-link>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">2nd menu item</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>

import { defineComponent } from 'vue';
 export default defineComponent({
  name: "the-create-list",
});
</script>

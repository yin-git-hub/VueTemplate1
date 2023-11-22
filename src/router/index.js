import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/views/AboutView.vue";
import store from "@/store";
import {notification} from "ant-design-vue";

const routes = [
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/',
    component: () => import( '../views/main.vue'),
    meta: {
      loginRequire: true
    },
    children: [{
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// 路由登录拦截
router.beforeEach((to, from, next) => {
  // 要不要对meta.loginRequire属性做监控拦截
  if (to.matched.some(function (item) {
    console.log(item, "是否需要登录校验：", item.meta.loginRequire || false);
    return item.meta.loginRequire
  })) {
    const _token = store.state.token;
    console.log("页面登录校验开始：", _token);
    if (!_token.token) {
      console.log("用户未登录或登录超时！");
      notification.error({ description: "未登录或登录超时" });
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router

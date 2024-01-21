import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import RoutesConfig from "./config";
import store from "@/store";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainBox",
    name: "mainBox",
    component: MainBox,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    // 如果已经登录,可以放行, 未授权,重定向login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      if (!store.state.isGetterRouter) {
        // 删除所有注册路由,再重新注册
        router.removeRoute("mainBox")
        ConfigRouter();
        next({
          path: to.fullPath,
        });
      } else {
        next();
      }
    }
  }
});

const ConfigRouter = () => {

  if(!router.hasRoute("mainBox")) {
    router.addRoute({
      path: "/mainBox",
      name: "mainBox",
      component: MainBox
    })
  }

  RoutesConfig.forEach((item) => {
    checkPermission(item) && router.addRoute("mainBox", item);
  });

  store.commit("changeGetterRouter", true)
};

const checkPermission = (item) => {
  if(item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
}

export default router;

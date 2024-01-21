import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue"
import Product from "@/views/Product.vue"
import News from "@/views/News.vue"
import New from "@/views/New.vue"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/news/:id',
    name: 'New',
    component: New
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
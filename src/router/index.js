import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: "",
  redirect: "/home"
}, {
  path: "/home",
  component: () => import("../views/Home/home.vue")
},
  {
    path: "/cart",
    component: () => import("../views/Cart/cart.vue")
  },
  {
    path: "/category",
    component: () => import("../views/Category/Category.vue")
  },
  {
    path: "/profile",
    component: () => import("../views/Profile/profile.vue")
  },
  {
    path: "/detail:iid",
    component: () => import("../views/detail/detail")
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/MainVue.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/components/ListVue.vue"),
      },
      {
        path: "/write",
        component: () => import("@/components/WriteVue.vue"),
      },
    ]
  },
  {
    path: "/add",
    component: () => import("@/components/DataCom.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/MainView.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/components/ListVue.vue"),
      },
      {
        path: "/write",
        component: () => import("@/components/WriteVue.vue"),
      },
      {
        path: "/edit/:id",
        component: () => import("@/components/EditVue.vue")
      }
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
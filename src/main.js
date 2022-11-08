import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";


import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Company from "@/views/admin/Company";
import axios from 'axios';
// views without layouts

// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/tables",
    component: Admin,
    children: [
      {
        path: "/admin/companies",
        component: Company,
      },
    ],
  },
  {
    path: "/",
    component: Auth,
    redirect: "/auth/login",
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


createApp(App).use(router, axios).mount("#app");

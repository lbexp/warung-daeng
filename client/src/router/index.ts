import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginView.vue')
    },
    {
      path: '/products/create',
      name: 'create-product',
      component: () => import('../views/Product/Create/CreateProductView.vue')
    }
  ]
})

export default router

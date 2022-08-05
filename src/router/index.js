import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import questions from '../views/questions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/questions',
      name: 'questions',
      component: questions
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import('../views/MusicView.vue'),
    }
  ]
})

export default router

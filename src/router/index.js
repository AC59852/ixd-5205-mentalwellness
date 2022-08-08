import { createRouter, createWebHistory } from 'vue-router'
import questions from '../views/QuestionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/questions',
      name: 'Questions',
      component: questions
    },
    {
      path: '/music',
      name: 'Music',
      component: () => import('../views/MusicView.vue'),
    },
    {
      path: '/care',
      name: 'Care',
      component: () => import('../views/CareView.vue'),
    },
    {
      path: '/meditation',
      name: 'Meditation',
      component: () => import('../views/MeditationView.vue'),
    },
    {
      path: '/checkin',
      name: 'Check-in',
      component: () => import('../views/CheckinView.vue'),
    },
    // catch all route
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import PlayerQueueView from '@/views/players/QueueView.vue'
import QueueDisplay from '@/views/tables/QueueDisplay.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/player_queue',
      alias: '/',
      name: 'player-queue',
      component: PlayerQueueView
    },
    {
      path: '/table/:number',
      name: 'table-display',
      component: QueueDisplay,
      meta: {
        hideNavbar: true,
      }
    },
    {
      path: '/bright_skies_queue',
      name: 'bright-skies-queue',
      component: () => import('@/views/bright_skies/QueueView.vue')
    },
  ]
})

export default router

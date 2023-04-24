import { createRouter, createWebHistory } from 'vue-router'
import JeuView from '../views/jeu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:idgame/:iduser',
      name: '',
      component: JeuView
    },

  ]
})

export default router

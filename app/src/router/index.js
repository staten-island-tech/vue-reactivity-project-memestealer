import { createRouter, createWebHistory } from 'vue-router'
import Banner from '@/views/Banner.vue'
import VueLists from '@/views/ViewLists.vue/'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Banner,
    },
    {
     path: '/nypd',
    name: 'nypd',
    component: VueLists,
    },
  ],
})

export default router
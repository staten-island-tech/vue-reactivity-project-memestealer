import { createRouter, createWebHistory } from 'vue-router'
import Banner from '@/views/Banner.vue'
import VueLists from '@/views/ViewLists.vue/'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/banner',
      name: 'home',
      component: Banner,
    },
    {
     path: '/',
    name: 'nypd',
    component: VueLists,
    },
  ],
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import LoginComponent from '../views/Login.vue'
// import auth from '../middleWare/auth'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('accessToken')) {
        console.log('ok')
        return router.push('/')
      }
      return next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('accessToken')) {
//     return router.push({ name: 'login' })
//   }
//   return next()
// })

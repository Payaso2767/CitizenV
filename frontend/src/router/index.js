import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import LoginComponent from '../views/Login.vue'
import Register from '../views/Register.vue'
import Test from '../views/Test.vue'
import Roleprovince from '../views/role/province/_id.vue'
import Roledistrict from '../views/role/district/_id.vue'
import Rolecommnue from '../views/role/commnue/_id.vue'
import EditInfo from '../views/info/_id.vue'
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
    path: '/role/province/:id',
    name: 'role-province-id',
    component: Roleprovince
  },
  {
    path: '/role/commnue/:id',
    name: 'role-commnue-id',
    component: Rolecommnue
  },
  {
    path: '/role/district/:id',
    name: 'role-district-id',
    component: Roledistrict
  },
  {
    path: '/info/edit/:id',
    name: 'info-edit-id',
    component: EditInfo
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('accessToken')) {
        console.log('ok')
        return router.push('/')
      }
      return next()
    }
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

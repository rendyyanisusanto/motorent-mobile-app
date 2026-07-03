import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'
import HomeView from '../views/HomeView.vue'

// Import other views as they are created
// import LoginView from '../views/LoginView.vue'
// import MotorDetailView from '../views/MotorDetailView.vue'
// import BookingView from '../views/BookingView.vue'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: SplashView
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/motors',
    name: 'MotorList',
    component: () => import('../views/MotorListView.vue')
  },
  {
    path: '/motor/:id',
    name: 'MotorDetail',
    component: () => import('../views/MotorDetailView.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/NotificationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/booking/:id',
    name: 'Booking',
    component: () => import('../views/BookingView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: () => import('../views/PaymentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/TransactionHistoryView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/history/:id',
    name: 'RentalDetail',
    component: () => import('../views/RentalDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/UserProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboardView.vue')
  },
  {
    path: '/admin/motors',
    name: 'MotorcycleManagement',
    component: () => import('../views/MotorcycleManagementView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router

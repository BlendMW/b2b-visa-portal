import { createRouter, createWebHistory } from 'vue-router';

import UserDashboard from '../pages/UserDashboard.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';
import WalletManagement from '../pages/WalletManagement.vue';
import Home from '../pages/Home.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/user', name: 'UserDashboard', component: UserDashboard },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/wallet', name: 'WalletManagement', component: WalletManagement },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

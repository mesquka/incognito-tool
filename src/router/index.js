import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Node from '@/views/Node.vue';
import Settings from '@/views/Settings.vue';
import About from '@/views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/node',
    name: 'node',
    component: Node,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

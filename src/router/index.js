import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Nodes from '@/views/Nodes.vue';
import Tokens from '@/views/Tokens.vue';
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
    path: '/nodes',
    name: 'nodes',
    component: Nodes,
  },
  {
    path: '/tokens',
    name: 'tokens',
    component: Tokens,
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

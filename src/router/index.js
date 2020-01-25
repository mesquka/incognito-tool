import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Node from '@/views/Node.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
];

const router = new VueRouter({
  routes,
});

export default router;

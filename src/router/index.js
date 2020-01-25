import Vue from 'vue';
import VueRouter from 'vue-router';
import Address from '@/views/Address.vue';
import Node from '@/views/Node.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'address',
    component: Address,
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

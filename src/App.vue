<template>
  <div class="app">
    <navbar></navbar>
    <div class="view-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import '@mdi/font/css/materialdesignicons.css';
import '@/css/base.css';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>

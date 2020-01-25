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
import 'bulma/css/bulma.css';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>

<style>
.html {
  width: 100vw;
}

.view-wrapper {
  padding: 60px 0 0 0;
}

.container-app {
  padding: 0 5vw 0 5vw;
}

.spacer {
  height: 30px;
}
</style>

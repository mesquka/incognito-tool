<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <span class="navbar-item">
        <img src="@/assets/incognito.svg">
        <span class="nav-spacer"></span>
        <router-link to="/"><strong>Mining Dashboard (unofficial)</strong></router-link>
        <span class="nav-spacer"></span>
        by
        <span class="nav-spacer"></span>
        <a href="https://mesquka.com/">@mesquka</a>
      </span>
      <div
        class="navbar-burger burger"
        v-on:click="showNav = !showNav"
        v-bind:class="{ 'is-active': showNav }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbar" class="navbar-menu" v-bind:class="{ 'is-active': showNav }">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <router-link to="/" class="navbar-item" v-on:click.native="showNav = false">
          Dashboard
        </router-link>
        <router-link to="/node" class="navbar-item" v-on:click.native="showNav = false">
          Node
        </router-link>
        <router-link to="/settings" class="navbar-item" v-on:click.native="showNav = false">
          Settings
        </router-link>
        <router-link to="/about" class="navbar-item" v-on:click.native="showNav = false">
          About
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      showNav: false,
    };
  },
};
</script>

<style scoped>
.nav-spacer {
  width: 5px;
}
</style>

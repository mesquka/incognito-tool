<template>
  <nav class="nav">
    <div class="bar">
      <div class="left">
        <img src="@/assets/incognito.svg">
        <div class="text">
          <router-link to="/"><strong>
            Incognito Tool (v{{version}})
          </strong></router-link>
        </div>
      </div>
      <div class="right">
        <span class="mdi mdi-menu" v-on:click="showNav = !showNav"></span>
      </div>
    </div>
    <div class="menu" :class="{active: showNav}">
      <router-link to="/" class="item" v-on:click.native="showNav = false">
        Dashboard
      </router-link>
      <router-link to="/nodes" class="item" v-on:click.native="showNav = false">
        Nodes
      </router-link>
      <router-link to="/price" class="item" v-on:click.native="showNav = false">
        Price
      </router-link>
      <router-link to="/tokens" class="item" v-on:click.native="showNav = false">
        Tokens
      </router-link>
      <router-link to="/settings" class="item" v-on:click.native="showNav = false">
        Settings
      </router-link>
      <router-link to="/about" class="item" v-on:click.native="showNav = false">
        About
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      showNav: false,
      version: process.env.VUE_APP_VERSION,
    };
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: calc(100vw - 32px);
  margin: 0 16px 0 16px;
  background: #282c37;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  border-radius: 0 0 20px 20px;
  z-index: 100;
}

.nav > .bar {
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 64px);
  z-index: 100;
  padding: 12px 16px 16px 16px;
}

.nav > .bar > .left {
  float: left;
}

.nav > .bar > .left > .text {
  float: right;
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
}

.nav > .bar > .left > img {
  float: left;
  height: 35px;
}

.nav > .bar > .right {
  float: right;
  font-size: 30px;
  cursor: pointer;
}

.nav > .menu {
  display: flex;
  width: calc(100vw - 32px);
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-height: 0;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    max-height 0.3s ease-in-out,
    transform 0.3s cubic-bezier(1,0,1,0);
}

.nav > .menu.active {
  max-height: 100vh;
  transform: scaleY(1);
  opacity: 100;
  transition:
    opacity 0.3s ease-in-out,
    max-height 0.3s ease-in-out,
    transform 0.3s cubic-bezier(0,1,0,1);
}

.nav > .menu > .item {
  background: #313543;
  padding: 12px;
  border-radius: 4px;
  height: 32px;
  min-width: 128px;
  width: calc(30% - 20px);
  text-align: center;
  line-height: 32px;
  color: #d9e1e8;
  margin: 0 10px 16px 10px;
}
</style>

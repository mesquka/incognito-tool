<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          About
        </p>
      </header>
      <div class="card-content">
        This is an <i>unofficial</i> web app to help you keep tabs on your incognito nodes.
        If you're having problems, open a github issue.
      </div>
      <footer class="card-footer">
        <a href="https://github.com/mesquka/incognito_mining_dashboard/issues/new" class="card-footer-item">New Github Issue</a>
      </footer>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Staking
        </p>
      </header>
      <div class="card-content">
        If you want to start staking yourself you can get started with a
        p-node (easy) or v-node (advanced).
      </div>
      <footer class="card-footer">
        <a href="https://incognito.org/t/unboxing-and-setting-up-your-physical-node-device/29" class="card-footer-item">Start Staking (Easy)</a>
        <a href="https://incognito.org/t/how-to-host-a-virtual-node/28" class="card-footer-item">Start Staking (Advanced)</a>
      </footer>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tips
        </p>
      </header>
      <div class="card-content">
        If you found this app useful, consider dropping me a few cryptos.
      </div>
      <footer class="card-footer">
        <a href="https://mesquka.com/tips" class="card-footer-item">Tip Me</a>
      </footer>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>

export default {
  name: 'about',
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>

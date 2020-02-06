<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tip
        </p>
      </header>
      <div class="card-content">
        If you're having issues you may need to allow unsafe scripts in your browser,
        in chrome this is usually found at the right of the address bar.
      </div>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style scoped>
.card-header {
  overflow: auto;
}

.table {
  table-layout: fixed;
}
</style>

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

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">{{blockchain.ActiveShards}}</p>
            <p class="subtitle">Shards</p>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">{{blockchain.TotalTxs}}</p>
            <p class="subtitle">Transactions Processed</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">{{mempool.Size}}</p>
            <p class="subtitle">Pending Transactions</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">{{blockchain.Beacon.Epoch}}</p>
            <p class="subtitle">Epoch</p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  computed: {
    blockchain() {
      return this.$store.state.blockchain;
    },
    mempool() {
      return this.$store.state.mempool;
    },
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

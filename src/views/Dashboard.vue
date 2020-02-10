<template>
  <div class="container-app">
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
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">{{mempool.Size}}</p>
            <p class="subtitle">Pending Transactions</p>
          </div>
        </article>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child notification">
          <div class="content">
            <p class="title">{{blockchain.Beacon.Epoch}}</p>
            <p class="subtitle">Epoch</p>
          </div>
        </article>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="columns">
      <div class="column">
        <div>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Beacon Chain
              </p>
            </header>
            <div class="card-content">
              <table class="table is-bordered is-hoverable is-fullwidth">
                <tbody>
                  <tr>
                    <th>Latest Block</th>
                    <td>{{blockchain.Beacon.Hash}}</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{{blockchain.Beacon.Height}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="spacer"></div>
        </div>

        <div v-for="(shard, index) in blockchain.Shards" v-bind:key="index">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Shard #{{shard.id}}
              </p>
            </header>
            <div class="card-content">
              <table class="table is-bordered is-hoverable is-fullwidth">
                <tbody>
                  <tr>
                    <th>Latest Block</th>
                    <td>{{shard.Hash}}</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{{shard.Height}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="spacer"></div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Pending Transactions
            </p>
          </header>
          <div class="card-content">
            <span v-if="!mempool.ListTxs || mempool.ListTxs.length === 0">
              No Pending Transactions
            </span>
            <table class="table is-bordered is-hoverable is-fullwidth">
              <tbody>
                <tr v-for="(tx, index) in mempool.ListTxs" v-bind:key="index">
                  <td>{{tx.TxID}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

td {
  overflow: auto;
}
</style>

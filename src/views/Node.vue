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

    <div v-for="(node, index) in nodes" v-bind:key="index">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{node.ip}}:{{node.port}}
          </p>
        </header>
        <div class="card-content">
          <table class="table is-bordered is-fullwidth">
            <tr>
              <th>Beacon Chain Height</th>
              <td>{{node.status.BeaconHeight}}</td>
            </tr>
            <tr>
              <th>Network</th>
              <td>{{node.status.Chain}}</td>
            </tr>
            <tr>
              <th>Staking</th>
              <td>{{node.status.IsEnableMining}}</td>
            </tr>
            <tr>
              <th>Layer</th>
              <td>{{node.status.Layer}}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{{node.status.Role}}</td>
            </tr>
            <tr>
              <th>ShardID</th>
              <td>{{node.status.ShardID}}</td>
            </tr>
            <tr>
              <th>Mining Key</th>
              <td>{{node.miningKey}}</td>
            </tr>
          </table>
          <strong>Rewards:</strong>
          <table class="table is-bordered is-fullwidth">
            <tr
              v-for="(reward, index) in node.rewards"
              v-bind:key="index"
            >
              <th>{{reward.Name}} ({{reward.PSymbol}})</th>
              <td>{{reward.amount/(10**reward.PDecimals)}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'node',
  computed: {
    nodes() {
      return this.$store.state.nodes;
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

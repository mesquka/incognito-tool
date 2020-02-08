<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Tip
        </p>
      </header>
      <div class="card-content content">
        <p>If you're having issues you may need to allow unsafe scripts in your browser,
        in chrome this is usually found at the right of the address bar.</p>
        <p>Node monitoring may not work in mobile browsers.</p>
      </div>
    </div>

    <div class="spacer"></div>

    <div v-for="(node, nodeIndex) in nodes" v-bind:key="nodeIndex">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{node.ip}}:{{node.port}}
          </p>
        </header>
        <div class="card-content">
          <table class="table is-bordered is-hoverable is-fullwidth">
            <tbody>
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
            </tbody>
          </table>
          <strong>Rewards:</strong>
          <table class="table is-bordered is-hoverable is-fullwidth">
            <tbody>
              <tr
                v-for="(reward, rewardIndex) in node.rewards"
                v-bind:key="rewardIndex"
              >
                <th>{{reward.Name}} ({{reward.PSymbol}})</th>
                <td>
                  {{prettyNum(
                    reward.amount/(10**reward.PDecimals),
                    {thousandsSeparator: ' '}
                  )}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import prettyNum, { PRECISION_SETTING } from 'pretty-num';

export default {
  name: 'nodes',
  data() {
    return {
      PRECISION_SETTING,
    };
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
  },
  methods: {
    prettyNum,
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

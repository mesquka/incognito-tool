<template>
  <div class="container-app">
    <nav class="level">
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item">
          <button v-on:click="toggleCollapsed" class="button is-light">
            <i v-if="!collapsed" class="mdi mdi-unfold-less-horizontal"></i>
            <i v-if="collapsed" class="mdi mdi-unfold-more-horizontal"></i>
          </button>
        </div>
      </div>
    </nav>

    <div class="spacer"></div>

    <div class="nodes-list">
      <node
        v-for="(node, index) in nodes"
        :key="index"
        :node="node"
        :collapsed="collapsed"
      ></node>
    </div>

    <!--<div v-if="collapsed">
      <div>
        <div class="card">
          <div class="card-content">
            <table class="table is-bordered is-hoverable is-fullwidth">
              <tbody>
                <tr v-for="(node, nodeIndex) in nodes" :key="nodeIndex">
                  <th>{{node.ip}}:{{node.port}}</th>
                  <td>{{node.status.Role}}</td>
                  <td>
                    {{prettyNum(
                      node.PRV/(10**9),
                      {thousandsSeparator: ' '}
                    )}}
                    PRV
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="spacer"></div>
      </div>
    </div>

    <div v-if="!collapsed">
      <div v-for="(node, nodeIndex) in nodes" :key="nodeIndex">
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
                  :key="rewardIndex"
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
    </div>-->
  </div>
</template>

<script>
import Node from '@/components/nodes/Node.vue';

export default {
  name: 'nodes',
  components: {
    Node,
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
    collapsed() {
      return this.$store.state.preferences.collapsed;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit('setPreference', {
        name: 'collapsed',
        value: !this.$store.state.preferences.collapsed,
      });
    },
  },
};
</script>

<style scoped>
.nodes-list {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: space-evenly;
  width: calc(100vw - 64px);
}
</style>

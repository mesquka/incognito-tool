<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Nodes
        </p>
        <p class="card-header-icon" v-on:click="addNode">
          <span class="icon">
            <i class="mdi mdi-plus"></i>
          </span>
        </p>
      </header>
      <div class="card-content">
        <div
          class="field is-grouped is-grouped-multiline"
          v-for="(node, index) in nodes"
          v-bind:key="index"
        >
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="IP"
              v-model="node.ip"
              v-on:blur="save"
            >
          </p>
          <p class="control">
            <input
              class="input"
              type="number"
              placeholder="Port"
              v-model="node.port"
              v-on:blur="save"
            >
          </p>
          <p class="control">
            <button class="button is-danger" v-on:click="deleteNode(index)">
              <i class="mdi mdi-delete"></i>
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Refresh Interval
        </p>
      </header>
      <div class="card-content">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input
              class="input"
              type="number"
              v-model.number="refreshInterval"
              v-on:input="save"
            >
          </p>
          <p class="control">
            <a class="button is-static">
              minutes
            </a>
          </p>
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Reset Settings
        </p>
      </header>
      <div class="card-content">
        <button class="button is-danger is-fullwidth" v-on:click="resetData">
          Reset App Settings
        </button>
        <small>Use this if you're experiencing issues with the dashboard</small>
      </div>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script>

export default {
  name: 'settings',
  data() {
    return {
      refreshInterval: this.$store.state.refreshInterval / 60 / 1000,
      nodes: this.$store.state.nodes,
    };
  },
  methods: {
    deleteNode(index) {
      this.nodes.splice(index, 1);
      this.save();
    },
    addNode() {
      this.nodes.push({
        ip: '',
        port: '9334',
        status: {},
        miningKey: '',
        rewards: {},
      });
    },
    save() {
      if (
        this.refreshInterval > 0
      ) {
        this.$store.commit('setRefreshInterval', this.refreshInterval * 60 * 1000);
        this.$root.dataUpdater.refreshInterval();
      }
      this.$store.commit('setNodes', this.nodes);
    },
    resetData() {
      window.localStorage.removeItem('vuex');
      window.location.reload();
    },
  },
};
</script>

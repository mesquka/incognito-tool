<template>
  <div class="container-app">
    <h1>Nodes</h1>

    <button class="add-button" v-on:click="addNode">
      <i class="mdi mdi-plus"></i>
    </button>

    <div class="nodes-list">
      <div class="node" v-for="(node, index) in nodes" :key="index">
        <header class="header">
          {{node.ip}}:{{node.port}}
        </header>
        <div class="content">
          <div class="field">
            <input
              class="input"
              type="text"
              placeholder="IP"
              v-model="node.ip"
              v-on:blur="save"
            >
            <div class="label">IP</div>
          </div>
          <div class="field">
            <input
              class="input"
              type="number"
              placeholder="Port"
              v-model="node.port"
              v-on:blur="save"
            >
            <div class="label">Port</div>
          </div>
          <div class="field">
            <label class="check">
              <input type="checkbox" v-model="node.directConnect" v-on:change="save">
              <span class="slider"></span>
            </label>
            <div class="label">Direct Connect</div>
          </div>
          <button class="delete-button" v-on:click="deleteNode(index)">
            <i class="mdi mdi-delete"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    <h1>Reset Settings</h1>
    <button class="delete-button" v-on:click="resetData">
      Reset App Settings
    </button>
    <br><br>
    <small>Use this if you're experiencing issues with the dashboard</small>
  </div>
</template>

<script>
import API from '@/api/api';

export default {
  name: 'settings',
  data() {
    return {
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
        directConnect: false,
        status: {},
        miningKey: '',
        rewards: {},
      });
    },
    save() {
      this.$store.commit('setNodes', this.nodes);
      API.refreshNodes();
    },
    resetData() {
      window.localStorage.removeItem('vuex');
      window.location.reload();
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
  margin-top: 16px;
}

.node {
  border-radius: 4px;
  min-width: 292px;
  width: calc(50% - 20px);
  text-align: center;
  background: #282c37;
  margin: 0 10px 16px 10px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
}

.node > .header {
  background: #313543;
  border-radius: 4px 4px 0 0;
  padding: 8px;
}

.node > .content {
  padding: 8px;
}

.node > .content > .field > .input {
  width: calc(100% - 16px);
  background: #191b22;
  color: #d9e1e8;
  border: 0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 2px;
}

.node > .content > .field > .label {
  font-size: 12px;
  margin: 0 16px 8px 16px;
  color: #606984;
}

.add-button {
  width: calc(100vw - 64px);
  color: #FFFFFF;
  background: #282c37;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  border: 0;
  padding: 8px;
}

.delete-button {
  width: 100%;
  color: #FFFFFF;
  background: hsl(348, 100%, 61%);
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0,0,0,.2);
  border: 0;
  padding: 8px;
}
</style>

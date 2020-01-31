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

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Addresses
        </p>
        <p class="card-header-icon" v-on:click="addAddress">
          <span class="icon">
            <i class="mdi mdi-plus"></i>
          </span>
        </p>
      </header>
      <div class="card-content">
        <div class="field is-grouped" v-for="(address, index) in addresses" v-bind:key="index">
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Address"
              v-model="address.address"
              v-on:input="save">
          </p>
          <p class="control">
            <button class="button is-danger" v-on:click="deleteAddress(index)">
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
          Nodes
        </p>
        <p class="card-header-icon" v-on:click="addNode">
          <span class="icon">
            <i class="mdi mdi-plus"></i>
          </span>
        </p>
      </header>
      <div class="card-content">
        <div class="field is-grouped" v-for="(node, index) in nodes" v-bind:key="index">
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="IP"
              v-model="node.ip"
              v-on:input="save">
          </p>
          <p class="control">
            <input
              class="input"
              type="number"
              placeholder="Port"
              v-model="node.port"
              v-on:input="save">
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
import store from '@/store';

export default {
  name: 'settings',
  data() {
    return {
      addresses: store.state.addresses,
      nodes: store.state.nodes,
    };
  },
  methods: {
    deleteAddress(index) {
      this.addresses.splice(index, 1);
      this.save();
    },
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
    addAddress() {
      this.addresses.push({
        address: '',
        rewards: [],
      });
    },
    save() {
      store.commit('setAddresses', this.addresses);
      store.commit('setNodes', this.nodes);
    },
    resetData() {
      window.localStorage.removeItem('vuex');
      window.location.reload();
    },
  },
};
</script>

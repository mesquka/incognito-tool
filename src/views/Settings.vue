<template>
  <div class="container-app">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Incognito Address
        </p>
      </header>
      <div class="card-content">
        <div class="field">
          <label class="label">Address</label>
          <div class="control">
            <input class="input" type="text" v-model="address">
          </div>
        </div>
        <div class="field">
          <label class="label">Public Key</label>
          <div class="control">
            <input class="input" type="text" v-model="pubKey" disabled>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" v-on:click="submitAddress">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" v-on:click="cancelAddress">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="spacer"></div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Node IP
        </p>
      </header>
      <div class="card-content">
        <div class="field">
          <label class="label">IP Address</label>
          <div class="control">
            <input class="input" type="text" v-model="nodeIP">
          </div>
        </div>
        <div class="field">
          <label class="label">Port</label>
          <div class="control">
            <input class="input" type="text" v-model="nodePort">
          </div>
        </div>
        <div class="field">
          <label class="label">BLS Key</label>
          <div class="control">
            <input class="input" type="text" v-model="nodeKey" disabled>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" v-on:click="submitNode">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" v-on:click="cancelNode">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'settings',
  data() {
    return {
      address: store.state.address,
      pubKey: store.state.pubKey,
      nodeIP: store.state.nodeIP,
      nodePort: store.state.nodePort,
      nodeKey: store.state.nodeKey,
    };
  },
  methods: {
    submitAddress() {
      store.dispatch('changeAddress', this.address).then(() => {
        this.address = store.state.address;
        this.pubKey = store.state.pubKey;
      }).catch(() => {
        this.address = store.state.address;
        this.pubKey = store.state.pubKey;
      });
    },
    cancelAddress() {
      this.address = store.state.address;
      this.pubKey = store.state.pubKey;
    },
    submitNode() {
      store.dispatch('changeNodeIP', {
        nodeIP: this.nodeIP,
        nodePort: parseInt(this.nodePort, 10),
      }).then(() => {
        this.nodeIP = store.state.nodeIP;
        this.nodePort = store.state.nodePort;
        this.nodeKey = store.state.nodeKey;
      }).catch(() => {
        this.nodeIP = store.state.nodeIP;
        this.nodePort = store.state.nodePort;
        this.nodeKey = store.state.nodeKey;
      });
    },
    cancelNode() {
      // const nodeEndpoint = node.includes(':') ? node : `${node}:9334`;
      this.nodeIP = store.state.nodeIP;
      this.nodePort = store.state.nodePort;
      this.nodeKey = store.state.nodeKey;
    },
  },
};
</script>

<style scoped>
.spacer {
  height: 30px;
}
</style>

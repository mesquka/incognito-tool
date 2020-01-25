<template>
  <div class="container-app">
    <div class="card">
      <div class="card-content">
        <h1 class="is-size-2">Address</h1>
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
      <div class="card-content">
        <h2 class="is-size-2">Node IP</h2>
        <div class="field">
          <label class="label">IP Address</label>
          <div class="control">
            <input class="input" type="text" v-model="nodeIP">
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
      store.dispatch('changeNodeIP', this.nodeIP).then(() => {
        this.nodeIP = store.state.nodeIP;
        this.nodeKey = store.state.nodeKey;
      }).catch(() => {
        this.nodeIP = store.state.nodeIP;
        this.nodeKey = store.state.nodeKey;
      });
    },
    cancelNode() {
      // const nodeEndpoint = node.includes(':') ? node : `${node}:9334`;
      this.nodeIP = store.state.nodeIP;
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

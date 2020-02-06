import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    refreshInterval: 300000,
    nodes: [],
    tokenNameIDMap: {},
    blockchain: {},
    mempool: {},
  },
  mutations: {
    updateNode(state, update) {
      state.nodes.forEach((node, index) => {
        if (
          node.ip === update.ip
          && node.port === update.port
        ) {
          Vue.set(state.nodes, index, Object.assign({}, node, update));
        }
      });
    },
    setRefreshInterval(state, refreshInterval) {
      state.refreshInterval = refreshInterval;
    },
    setBlockchain(state, blockchain) {
      state.blockchain = blockchain;
    },
    setMempool(state, mempool) {
      state.mempool = mempool;
    },
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    setTokenNameIDMap(state, tokenNameIDMap) {
      state.tokenNameIDMap = tokenNameIDMap;
    },
  },
  plugins: [new VuexPersistence({
    storage: window.localStorage,
  }).plugin],
});

if (
  !store.state.refreshInterval
  || typeof store.state.refreshInterval !== 'number'
  || !store.state.nodes
  || typeof store.state.nodes !== 'object'
  || !store.state.tokenNameIDMap
  || typeof store.state.tokenNameIDMap !== 'object'
  || !store.state.blockchain
  || typeof store.state.blockchain !== 'object'
  || !store.state.mempool
  || typeof store.state.mempool !== 'object'
) {
  window.localStorage.removeItem('vuex');
  window.location.reload();
}

export default store;

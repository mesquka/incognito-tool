import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    refreshInterval: 300000,
    nodes: [],
    verifiedTokens: [],
    unverifiedTokens: [],
    tokenNameIDMap: {},
    blockchain: {},
    mempool: {},
  },
  mutations: {
    updateNode(state, update) {
      const updateCandidate = update;
      delete updateCandidate.directConnect;

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
    setVerifiedTokens(state, verifiedTokens) {
      state.verifiedTokens = verifiedTokens;
    },
    setUnverifiedTokens(state, unverifiedTokens) {
      state.unverifiedTokens = unverifiedTokens;
    },
    setTokenNameIDMap(state, tokenNameIDMap) {
      state.tokenNameIDMap = tokenNameIDMap;
    },
  },
  plugins: [new VuexPersistence({
    storage: window.localStorage,
  }).plugin],
});

export default store;

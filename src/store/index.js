import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    storeVersion: process.env.VUE_APP_VERSION,
    preferences: {},
    nodes: [],
    chainStats: {},
    tokensInfo: {},
    markets: [],
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
    changePreference(state, preference) {
      state[preference.name] = preference.value;
    },
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    setMarket(state, market) {
      state.markets = market;
    },
    setChainStats(state, chainStats) {
      state.chainStats = chainStats;
    },
    setTokensInfo(state, tokensInfo) {
      state.tokensInfo = tokensInfo;
    },
  },
  plugins: [new VuexPersistence({
    storage: window.localStorage,
  }).plugin],
});

if (store.state.storeVersion !== process.env.VUE_APP_VERSION) {
  window.localStorage.removeItem('vuex');
  window.location.reload();
}

export default store;

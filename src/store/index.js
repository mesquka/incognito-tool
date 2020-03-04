import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    storeVersion: process.env.VUE_APP_VERSION,
    preferences: {
      collapsed: false,
    },
    nodes: [],
    chainStats: {},
    tokensInfo: {},
    markets: {},
    beaconBlockTimeIndex: {},
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
    setPreference(state, preference) {
      state.preferences[preference.name] = preference.value;
    },
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    setBeaconBlockTimeIndex(state, beaconBlock) {
      state.beaconBlockTimeIndex[beaconBlock.height] = beaconBlock.time;
    },
    deleteBeaconBlockTimeIndex(state, beaconBlockHeight) {
      delete state.beaconBlockTimeIndex[beaconBlockHeight];
    },
    setMarketPriceAtTime(state, market) {
      if (!state.markets[market.name]) Vue.set(state.markets, market.name, {});
      Vue.set(state.markets[market.name], market.time, market.rate);
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
  actions: {
    prunePrices(context) {
      Object.keys(context.state.markets).forEach((market) => {
        console.log(market);
      });
    },
  },
});

if (store.state.storeVersion !== process.env.VUE_APP_VERSION) {
  window.localStorage.removeItem('vuex');
  window.location.reload();
}

export default store;

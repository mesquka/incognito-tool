import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    refreshInterval: 5000,
    nodes: [],
    tokenNameIDMap: {},
  },
  mutations: {
    setRefreshInterval(state, refreshInterval) {
      state.refreshInterval = refreshInterval;
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
) {
  window.localStorage.removeItem('vuex');
  window.location.reload();
}

export default store;

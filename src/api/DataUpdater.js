import api from '@/api';
import store from '@/store';

class DataUpdater {
  constructor() {
    this.cycle = 0;

    api.tokenList().then((tokenNameIDMap) => {
      store.commit('setTokenNameIDMap', tokenNameIDMap);
    });

    this.refreshInterval();
  }

  refreshInterval() {
    this.clearInterval();
    this.refreshTimer = setInterval(DataUpdater.refresh, store.state.refreshInterval);
    DataUpdater.refresh();
  }

  clearInterval() {
    clearInterval(this.refreshTimer);
  }

  static tokenIDToToken(id) {
    if (store.state.tokenNameIDMap[id]) return store.state.tokenNameIDMap[id];
    if (id.length !== 64) return id;
    return false;
  }

  static refresh() {
    store.state.nodes.forEach((node) => {
      const update = node;

      api.getMiningInfo(`http://${node.ip}:${node.port}`).then((status) => {
        update.status = status;
        store.commit('updateNode', update);
      });

      api.getPublicKeyMining(`http://${node.ip}:${node.port}`).then((miningKey) => {
        [update.miningKey] = miningKey;
        store.commit('updateNode', update);

        api.getMinerRewardFromMiningKey(miningKey[0]).then((rewards) => {
          update.rewards = [];
          Object.keys(rewards).forEach((id) => {
            if (DataUpdater.tokenIDToToken(id)) {
              const token = DataUpdater.tokenIDToToken(id);
              token.amount = rewards[id];
              update.rewards.push(token);
            }
          });
          store.commit('updateNode', update);
        });
      });
    });
  }
}

export default DataUpdater;

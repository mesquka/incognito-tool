import api from '@/api';
import store from '@/store';

class DataUpdater {
  constructor() {
    this.cycle = 0;
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
      const update = Object.assign({}, node);

      api.getMiningInfo(`http://${node.ip}:${node.port}`, node.directConnect).then((status) => {
        update.status = status;
        store.commit('updateNode', update);
      });

      api.getPublicKeyMining(`http://${node.ip}:${node.port}`, node.directConnect).then((miningKey) => {
        [update.miningKey] = miningKey;
        store.commit('updateNode', update);

        api.getMinerRewardFromMiningKey(miningKey[0]).then((rewards) => {
          update.rewards = [];
          Object.keys(rewards).forEach((id) => {
            if (DataUpdater.tokenIDToToken(id)) {
              const token = Object.assign({}, DataUpdater.tokenIDToToken(id));
              token.amount = rewards[id];
              update.rewards.push(token);
            }
          });
          store.commit('updateNode', update);
        });
      });
    });

    api.tokenList().then((result) => {
      const tokenNameIDMap = {
        PRV: {
          Name: 'Incognito',
          PSymbol: 'PRV',
          PDecimals: 9,
        },
      };

      const verifiedTokens = [];
      const unverifiedTokens = [];

      result.forEach((token) => {
        if (token.Verified) {
          tokenNameIDMap[token.TokenID] = token;
          tokenNameIDMap[token.PSymbol] = token;
          verifiedTokens.push(token);
        } else {
          unverifiedTokens.push(token);
        }
      });

      store.commit('setTokenNameIDMap', tokenNameIDMap);
      store.commit('setVerifiedTokens', verifiedTokens);
      store.commit('setUnverifiedTokens', unverifiedTokens);
    });


    api.getBlockchainInfo().then(blockchainInfo => store.commit('setBlockchain', blockchainInfo));
    api.getMempoolInfo().then(mempoolInfo => store.commit('setMempool', mempoolInfo));
  }
}

export default DataUpdater;

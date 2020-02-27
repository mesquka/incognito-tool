import apiInterface from '@/api/apiInterface';
import store from '@/store';

class API {
  constructor() {
    API.refreshAll();
  }

  static tokenIDToToken(id) {
    if (store.state.tokensInfo.tokenNameIDMap[id]) return store.state.tokensInfo.tokenNameIDMap[id];
    if (id.length !== 64) return id;
    return false;
  }

  static async getNodesStatus(node) {
    const update = Object.assign({}, node);

    update.status = await apiInterface.getMiningInfo(`http://${node.ip}:${node.port}`, node.directConnect);
    [update.miningKey] = await apiInterface.getPublicKeyMining(`http://${node.ip}:${node.port}`, node.directConnect);

    const rewards = await apiInterface.getMinerRewardFromMiningKey(update.miningKey);
    update.rewards = [];
    Object.keys(rewards).forEach((id) => {
      if (API.tokenIDToToken(id)) {
        const token = Object.assign({}, API.tokenIDToToken(id));
        token.amount = rewards[id];
        if (API.tokenIDToToken(id).PSymbol === 'PRV') {
          update.PRV = token.amount;
        }
        update.rewards.push(token);
      }
    });

    return update;
  }

  static async getTokensInfo() {
    const tokenList = await apiInterface.tokenList();
    const tokenNameIDMap = {
      PRV: {
        Name: 'Incognito',
        PSymbol: 'PRV',
        PDecimals: 9,
      },
      '0000000000000000000000000000000000000000000000000000000000000004': {
        Name: 'Incognito',
        PSymbol: 'PRV',
        PDecimals: 9,
      },
    };

    const verifiedTokens = [];
    const unverifiedTokens = [];

    tokenList.forEach((token) => {
      if (token.Verified) {
        tokenNameIDMap[token.TokenID] = token;
        tokenNameIDMap[token.PSymbol] = token;
        verifiedTokens.push(token);
      } else {
        unverifiedTokens.push(token);
      }
    });

    return {
      tokenNameIDMap,
      verifiedTokens,
      unverifiedTokens,
    };
  }

  static async getPDEXAtBlockHeight(blockHeight) {
    const pDEXInfo = await apiInterface.getPDEXInfo(blockHeight);
    const prices = {};
    Object.keys(pDEXInfo.PDEPoolPairs).forEach((pair) => {
      if (
        API.tokenIDToToken(pDEXInfo.PDEPoolPairs[pair].Token1IDStr)
        && API.tokenIDToToken(pDEXInfo.PDEPoolPairs[pair].Token2IDStr)
      ) {
        const token1Value = pDEXInfo.PDEPoolPairs[pair].Token1PoolValue
          / (10 ** API.tokenIDToToken(
            pDEXInfo.PDEPoolPairs[pair].Token1IDStr,
          ).PDecimals);
        const token2Value = pDEXInfo.PDEPoolPairs[pair].Token2PoolValue
          / (10 ** API.tokenIDToToken(
            pDEXInfo.PDEPoolPairs[pair].Token2IDStr,
          ).PDecimals);

        const price = {
          token1: API.tokenIDToToken(pDEXInfo.PDEPoolPairs[pair].Token1IDStr).PSymbol,
          token2: API.tokenIDToToken(pDEXInfo.PDEPoolPairs[pair].Token2IDStr).PSymbol,
          rate: token2Value / token1Value,
        };
        prices[`${price.token1}-${price.token2}`] = price;
      }
    });
    return prices;
  }

  static async getChainStats() {
    const blockchainInfo = await apiInterface.getBlockchainInfo();
    const mempoolInfo = await apiInterface.getMempoolInfo();
    return {
      blockchainInfo,
      mempoolInfo,
    };
  }

  static async refreshAll() {
    const chainStats = await API.getChainStats();
    store.commit('setChainStats', chainStats);

    const tokensInfo = await API.getTokensInfo();
    store.commit('setTokensInfo', tokensInfo);

    const prices = await API.getPDEXAtBlockHeight(
      store.state.chainStats.blockchainInfo.Beacon.Height,
    );
    store.commit('setPrices', prices);

    store.state.nodes.forEach(async (node) => {
      const nodeStatus = API.getNodesStatus(node);
      store.commit('updateNode', nodeStatus);
    });
  }
}

export default API;

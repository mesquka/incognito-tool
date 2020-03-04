import apiInterface from '@/api/apiInterface';
import store from '@/store';

class API {
  constructor() {
    API.refreshAll();

    // TODO: Replace with websocket subscription to new blocks when avaiable
    setInterval(API.refreshAll, 5 * 60 * 1000);
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
    return {
      prices,
      time: pDEXInfo.BeaconTimeStamp,
    };
  }

  static async getChainStats() {
    const blockchainInfo = await apiInterface.getBlockchainInfo();
    const mempoolInfo = await apiInterface.getMempoolInfo();
    return {
      blockchainInfo,
      mempoolInfo,
    };
  }

  static async refreshMarketDataForHeight(height) {
    const marketData = await API.getPDEXAtBlockHeight(
      height,
    );

    store.commit('setBeaconBlockTimeIndex', {
      height,
      time: new Date(marketData.time * 1000).toString(),
    });

    Object.keys(marketData.prices).forEach((market) => {
      store.commit('setMarketPriceAtTime', {
        name: market,
        time: new Date(marketData.time * 1000).toString(),
        rate: marketData.prices[market].rate,
      });
    });
  }

  static async refreshMarketData() {
    let marketBlocks = [
      store.state.chainStats.blockchainInfo.Beacon.Height,
    ];

    for (let i = 0; i <= 40; i += 1) {
      marketBlocks.push(store.state.chainStats.blockchainInfo.Beacon.Height - i);
      marketBlocks.push(
        Math.floor(store.state.chainStats.blockchainInfo.Beacon.Height / 100) * 100 - i * 100,
      );
    }

    for (let i = 0; i <= 500; i += 1) {
      if (
        Math.floor(store.state.chainStats.blockchainInfo.Beacon.Height / 1000) * 1000 - i * 1000 > 0
      ) {
        marketBlocks.push(
          Math.floor(store.state.chainStats.blockchainInfo.Beacon.Height / 1000) * 1000 - i * 1000,
        );
      }
    }

    marketBlocks = marketBlocks.filter((v, i) => marketBlocks.indexOf(v) === i);

    Object.keys(store.state.beaconBlockTimeIndex).forEach((block) => {
      if (!marketBlocks.indexOf(block)) store.commit('deleteBeaconBlockTimeIndex', block);
    });

    store.dispatch('prunePrices');

    /* Prevents locking up browser with excessive network calls */
    for (let i = 0; i < marketBlocks.length; i += 16) {
      const waitFor = [];
      marketBlocks.slice(i, i + 16).forEach(async (block) => {
        if (!store.state.beaconBlockTimeIndex[block]) {
          waitFor.push(API.refreshMarketDataForHeight(block));
        }
      });
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(waitFor);
    }
  }

  static async refreshChainStats() {
    const chainStats = await API.getChainStats();
    store.commit('setChainStats', chainStats);
  }

  static async refreshTokenInfo() {
    const tokensInfo = await API.getTokensInfo();
    store.commit('setTokensInfo', tokensInfo);
  }

  static async refreshNodes() {
    store.state.nodes.forEach(async (node) => {
      const nodeStatus = await API.getNodesStatus(node);
      store.commit('updateNode', nodeStatus);
    });
  }

  static async refreshAll() {
    await API.refreshChainStats();
    await API.refreshTokenInfo();
    API.refreshMarketData();
    API.refreshNodes();
  }
}

export default API;

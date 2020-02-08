import axios from 'axios';
import uuid from 'uuid/v4';

const INCOGNITO_NODE = 'https://mainnet.incognito.org/fullnode';
const INCOGNITO_API = 'https://api.incognito.org';
const PROXY_PREFIX = 'https://thingproxy.freeboard.io/fetch/';

function tokenList() {
  return new Promise((resolve, reject) => {
    axios.get(`${INCOGNITO_API}/ptoken/list`).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getPublicKeyFromPaymentAddress(address) {
  return new Promise((resolve, reject) => {
    axios.post(INCOGNITO_NODE, {
      jsonrpc: '2.0',
      method: 'getpublickeyfrompaymentaddress',
      params: [address],
      id: uuid(),
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function listRewardAmount() {
  return new Promise((resolve, reject) => {
    axios.post(INCOGNITO_NODE, {
      jsonrpc: '2.0',
      method: 'listrewardamount',
      id: uuid(),
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getPublicKeyMining(node, direct) {
  return new Promise((resolve, reject) => {
    const endpoint = direct ? `${node}` : `${PROXY_PREFIX}${node}`;
    console.log(endpoint);
    axios.post(endpoint, {
      jsonrpc: '2.0',
      method: 'getpublickeymining',
      id: uuid(),
    }).then((result) => {
      if (result.data.Error === null && result.data.Result !== null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getMinerRewardFromMiningKey(key) {
  return new Promise((resolve, reject) => {
    axios.post(INCOGNITO_NODE, {
      jsonrpc: '2.0',
      method: 'getminerrewardfromminingkey',
      params: [key],
      id: 1,
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getMiningInfo(node, direct) {
  return new Promise((resolve, reject) => {
    const endpoint = direct ? `${node}` : `${PROXY_PREFIX}${node}`;
    axios.post(endpoint, {
      jsonrpc: '2.0',
      method: 'getmininginfo',
      id: 1,
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getBlockchainInfo() {
  return new Promise((resolve, reject) => {
    axios.post(INCOGNITO_NODE, {
      jsonrpc: '2.0',
      method: 'getblockchaininfo',
      id: 1,
    }).then((result) => {
      if (result.data.Error === null) {
        const blockchainInfo = result.data.Result;

        blockchainInfo.TotalTxs = blockchainInfo.BestBlocks['-1'].TotalTxs;
        blockchainInfo.Shards = [];
        blockchainInfo.Beacon = blockchainInfo.BestBlocks['-1'];
        delete blockchainInfo.BestBlocks['-1'];

        Object.keys(blockchainInfo.BestBlocks).forEach((shardNum) => {
          const shard = blockchainInfo.BestBlocks[shardNum];
          shard.id = shardNum;
          blockchainInfo.TotalTxs += blockchainInfo.BestBlocks[shardNum].TotalTxs;
          blockchainInfo.Shards.push(shard);
        });

        delete blockchainInfo.BestBlocks;

        resolve(blockchainInfo);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getMempoolInfo() {
  return new Promise((resolve, reject) => {
    axios.post(INCOGNITO_NODE, {
      jsonrpc: '2.0',
      method: 'getmempoolinfo',
      id: 1,
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

export default {
  tokenList,
  getPublicKeyFromPaymentAddress,
  listRewardAmount,
  getPublicKeyMining,
  getMinerRewardFromMiningKey,
  getMiningInfo,
  getBlockchainInfo,
  getMempoolInfo,
};

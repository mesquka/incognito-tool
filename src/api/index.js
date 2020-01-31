import axios from 'axios';
import uuid from 'uuid/v4';
import store from '@/store';

const INCOGNITO_NODE = 'https://mainnet.incognito.org/fullnode';
const INCOGNITO_API = 'https://api.incognito.org';
// const IMAGES_ROOT = 'https://storage.googleapis.com/incognito/wallet/tokens/icons';

axios.get(`${INCOGNITO_API}/ptoken/list`).then((res) => {
  const tokenNameIDMap = {
    PRV: {
      Name: 'Incognito',
      PSymbol: 'PRV',
      PDecimals: 9,
    },
  };
  res.data.Result.forEach((token) => {
    if (token.Verified) tokenNameIDMap[token.TokenID] = token;
    if (token.Verified) tokenNameIDMap[token.PSymbol] = token;
  });
  store.commit('setTokenNameIDMap', tokenNameIDMap);
});

function tokenIDToToken(id) {
  if (store.state.tokenNameIDMap[id]) return store.state.tokenNameIDMap[id];
  if (id.length !== 64) return id;
  return false;
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

function getPublicKeyMining(node) {
  return new Promise((resolve, reject) => {
    axios.post(node, {
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

function getMiningInfo(node) {
  return new Promise((resolve, reject) => {
    axios.post(node, {
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

export default {
  tokenIDToToken,
  getPublicKeyFromPaymentAddress,
  listRewardAmount,
  getPublicKeyMining,
  getMinerRewardFromMiningKey,
  getMiningInfo,
};

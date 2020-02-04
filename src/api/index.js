import axios from 'axios';
import uuid from 'uuid/v4';

const INCOGNITO_NODE = 'https://mainnet.incognito.org/fullnode';
const INCOGNITO_API = 'https://api.incognito.org';

function tokenList() {
  return new Promise((resolve, reject) => {
    axios.get(`${INCOGNITO_API}/ptoken/list`).then((result) => {
      if (result.data.Error === null) {
        const tokenNameIDMap = {
          PRV: {
            Name: 'Incognito',
            PSymbol: 'PRV',
            PDecimals: 9,
          },
        };
        result.data.Result.forEach((token) => {
          if (token.Verified) tokenNameIDMap[token.TokenID] = token;
          if (token.Verified) tokenNameIDMap[token.PSymbol] = token;
        });
        resolve(tokenNameIDMap);
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
  tokenList,
  getPublicKeyFromPaymentAddress,
  listRewardAmount,
  getPublicKeyMining,
  getMinerRewardFromMiningKey,
  getMiningInfo,
};

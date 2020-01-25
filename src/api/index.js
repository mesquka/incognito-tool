const axios = require('axios');
const uuid = require('uuid/v4');

const endpoint = 'https://mainnet.incognito.org/fullnode';

function getPublicKeyFromPaymentAddress(address) {
  return new Promise((resolve, reject) => {
    axios.post(endpoint, {
      jsonrpc: '2.0',
      method: 'getpublickeyfrompaymentaddress',
      params: [address],
      id: uuid(),
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function listRewardAmount() {
  return new Promise((resolve, reject) => {
    axios.post(endpoint, {
      jsonrpc: '2.0',
      method: 'listrewardamount',
      id: uuid(),
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result);
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
        resolve(result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

function getMinerRewardFromMiningKey(key) {
  return new Promise((resolve, reject) => {
    axios.post(endpoint, {
      jsonrpc: '2.0',
      method: 'getminerrewardfromminingkey',
      params: [key],
      id: 1,
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

module.exports = {
  getPublicKeyFromPaymentAddress,
  listRewardAmount,
  getPublicKeyMining,
  getMinerRewardFromMiningKey,
};

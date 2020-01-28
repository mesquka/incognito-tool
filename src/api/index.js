import axios from 'axios';
import uuid from 'uuid/v4';

const ENDPOINT = 'https://mainnet.incognito.org/fullnode';

const TOKEN_MAP = {
  '0000000000000000000000000000000000000000000000000000000000000004': 'PRV',
  ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f: 'pETH',
  b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696: 'pBTC',
  b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b: 'pBNB',
  b20810f4d2a1dde8046028819d9fa12549e04ce14fb299594da8cfca9be5d856: 'pUSD',
  a0a22d131bbfdc892938542f0dbe1a7f2f48e16bc46bf1c5404319335dc1f0df: 'pTomo',
  '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0': 'pUSDT',
};

function tokenIDToName(id) {
  if (TOKEN_MAP[id]) return TOKEN_MAP[id];
  return false;
}

function getPublicKeyFromPaymentAddress(address) {
  return new Promise((resolve, reject) => {
    axios.post(ENDPOINT, {
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
    axios.post(ENDPOINT, {
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
    axios.post(ENDPOINT, {
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
  tokenIDToName,
  getPublicKeyFromPaymentAddress,
  listRewardAmount,
  getPublicKeyMining,
  getMinerRewardFromMiningKey,
  getMiningInfo,
};

import axios from 'axios';
import uuid from 'uuid/v4';

const DEFAULT_NODE = 'https://mainnet.incognito.org/fullnode';
const PROXY = 'https://cors-proxy-mesquka.herokuapp.com/';

function call(method, params, node) {
  return new Promise((resolve, reject) => {
    const endpoint = node || DEFAULT_NODE;
    axios.post(`${PROXY}${endpoint}`, {
      jsonrpc: '2.0',
      method,
      params,
      id: uuid(),
    }).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject(new Error(result.data.Error));
      }
    }).catch(err => reject(new Error(err)));
  });
}


/*
  incognito-chain/rpcserver/rpcinterface.go
  Last updated at commit 35b30510fc2dcbcd4258930f697999614e605352
*/
const methodNames = [
  /* Node */
  'getNodeRole',
  'getNetworkInfo',
  'getConnectionCount',
  'getAllConnectedPeers',
  'getInOutMessages',
  'getInOutMessageCount',
  'getAllPeers',
  'estimateFee',
  'estimateFeeWithEstimator',
  'getActiveShards',
  'getMaxShardsNumber',

  /* Tx Pool */
  'getRawMempool',
  'getNumberOfTxsInMempool',
  'getMempoolEntry',
  'removeTxInMempool',
  'getMempoolInfo',
  'getPendingTxsInBlockgen',

  /* Block Pool */
  'getShardToBeaconPoolStateV2',
  'getCrossShardPoolStateV2',
  'getShardPoolStateV2',
  'getBeaconPoolStateV2',
  'getNextCrossShard',

  /* Block */
  'getBestBlock',
  'getBestBlockHash',
  'retrieveBlock',
  'retrieveBlockByHeight',
  'retrieveBeaconBlock',
  'retrieveBeaconBlockByHeight',
  'getBlocks',
  'getBlockChainInfo',
  'getBlockCount',
  'getBlockHash',
  'checkHashValue',
  'getBlockHeader',
  'getCrossShardBlock',

  /* Transaction */
  'listOutputCoins',
  'createRawTransaction',
  'sendRawTransaction',
  'createAndSendTransaction',
  'getTransactionByHash',
  'getTransactionHashByReceiver',
  'getTransactionByReceiver',
  'createAndSendStakingTransaction',
  'createAndSendStopAutoStakingTransaction',
  'randomCommitments',
  'hasSerialNumbers',
  'hasSnDerivators',
  'listSerialNumbers',
  'listCommitments',
  'listCommitmentIndices',

  /* Best State */
  'getCandidateList',
  'getCommitteeList',
  'getShardBestState',
  'getShardBestStateDetail',
  'getBeaconBestState',
  'getBeaconBestStateDetail',
  'getBeaconPoolState',
  'getShardPoolState',
  'getShardPoolLatestValidHeight',
  'canPubkeyStake',
  'getTotalTransaction',

  /* Custom Tokens */
  'createRawPrivacyCustomTokenTransaction',
  'sendRawPrivacyCustomTokenTransaction',
  'createAndSendPrivacyCustomTokenTransaction',
  'listPrivacyCustomToken',
  'privacyCustomTokenTxs',
  'getListPrivacyCustomTokenBalance',
  'getBalancePrivacyCustomToken',

  /* Bridge */
  'createIssuingRequest',
  'sendIssuingRequest',
  'createAndSendIssuingRequest',
  'createAndSendContractingRequest',
  'checkETHHashIssued',
  'getAllBridgeTokens',
  'getETHHeaderByHash',
  'getBridgeReqWithStatus',
  'generateTokenID',

  /* Wallet */
  'getPublicKeyFromPaymentAddress',
  'defragmentAccount',
  'getStackingAmount',
  'hashToIdenticon',
  'createAndSendBurningRequest',
  'createAndSendTxWithIssuingETHReq',

  /* Ethereum Bridge */
  'getBeaconSwapProof',
  'getLatestBeaconSwapProof',
  'getBridgeSwapProof',
  'getLatestBridgeSwapProof',
  'getBurnProof',

  /* Rewards */
  'createRawWithDrawTransaction',
  'getRewardAmount',
  'listRewardAmount',

  /* Revert */
  'revertBeaconChain',
  'revertShardChain',

  /* Mining */
  'getMiningInfo',
  'enableMining',
  'getChainMiningStatus',
  'getPublickeyMining',
  'getPublicKeyRole',
  'getRoleByValidatorKey',
  'getIncognitoPublicKeyRole',
  'getMinerRewardFromMiningKey',
  'getProducersBlackList',
  'getProducersBlackListDetail',

  /* PDEX */
  'getPDEState',
  'createAndSendTxWithWithdrawalReq',
  'createAndSendTxWithPTokenTradeReq',
  'createAndSendTxWithPRVTradeReq',
  'createAndSendTxWithPTokenContribution',
  'createAndSendTxWithPRVContribution',
  'getPDEContributionStatus',
  'getPDEContributionStatusV2',
  'getPDETradeStatus',
  'getPDEWithdrawalStatus',
  'convertPDEPrices',
  'extractPDEInstsFromBeaconBlock',

  /* Miscellaneous */
  'getBurningAddress',
  'getBurnProofForDepositToSC',
  'createAndSendBurningForDepositToSCRequest',
];

const methods = {};

methodNames.forEach((methodName) => {
  methods[methodName] = (params, node) => call(methodName.toLowerCase(), params, node);
});

export default {
  DEFAULT_NODE,
  PROXY,
  call,
  methods,
};

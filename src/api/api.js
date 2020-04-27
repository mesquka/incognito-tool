import axios from 'axios';

const ENDPOINT = 'https://api.incognito.org';

function tokens() {
  return new Promise((resolve, reject) => {
    axios.get(`${ENDPOINT}/ptoken/list`).then((result) => {
      if (result.data.Error === null) {
        resolve(result.data.Result);
      } else {
        reject();
      }
    }).catch(reject);
  });
}

export default {
  ENDPOINT,
  tokens,
};

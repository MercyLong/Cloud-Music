import request from 'superagent';
export function fetch(method, url, option) {
  if (method.toUpperCase() === 'GET') {
    return request(method, url).set('content-type', 'application/json').withCredentials() // send cookie
      .query(option).then(response => {
        return JSON.parse(response.text);
      }).catch(err => (Promise.reject(err)));
  } else {
    return request(method, url).type('form').withCredentials() // send cookie
      .send(option).then(response => {
        return JSON.parse(response.text);
      }).catch(err => (Promise.reject(err)));
  }
};

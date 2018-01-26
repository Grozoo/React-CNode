/**
 *
 *
 * @param {string} location 请求地址
 * @param {string} method 请方式
 * @param {object} mes 参数
 * @returns {promise}
 */
const fetchJson = (location, method, mes) => {
  if (method.toUpperCase() === 'GET') {
    Object.keys(mes);
    let param = '?';
    for (let key in mes) {
      param = param + `&${key}=${mes[key]}`;
    }
    return fetch(location.concat(param.replace('&', ''))).then(response =>
      response.json()
    );
  } else if (method.toUpperCase() === 'POST') {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...mes.headers
    };
    const body = JSON.stringify(mes.body);
    const par = { headers, body };
    console.log(par);
    return fetch(location, { method, headers, body }).then(response =>
      response.json()
    );
  } else {
    throw Error('请求方法错误');
  }
};

export default fetchJson;

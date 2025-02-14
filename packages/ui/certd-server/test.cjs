var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('login_name', 'Admin');
data.append('passwd', 'jM5eKu5uq!@3Ibyy');
data.append('locale_id', 'default');

var config = {
  method: 'post',
  url: 'https://vps-b6941c0f.vps.ovh.net:8443/login_up.php',
  headers: {
    'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
    Accept: '*/*',
    Host: 'vps-b6941c0f.vps.ovh.net:8443',
    Connection: 'keep-alive',
    Referer: 'https://vps-b6941c0f.vps.ovh.net:8443/login.php',
    ...data.getHeaders(),
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

const axios = require('axios');

const title = document.getElementById('title');
const content = document.getElementById('content');

const HOST = 'http://localhost:2021';

axios
  .get(HOST)
  .then((res) => {
    const data = res.data;
    console.log('res: ', data);
    // you can use jquery for this
    content.innerHTML = JSON.stringify(data, null, 2);
    title.innerHTML = `${data.topics.length} results found`;
  })
  .catch((err) => {
    console.log('error', err);
    title.innerHTML = 'ERROR';
    content.innerHTML = err;
  });

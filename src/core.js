
const WebSocket = require('ws');

const EDGE_CORE_URL = process.env.RIC_EDGE_URL || 'ws://localhost:17080/zigbee';


async function connect() {
  const ws = new WebSocket(EDGE_CORE_URL);

  ws.on('message', data => {
    console.log('message', data);
  });

  return new Promise((resolve, reject) => {
    ws.on('open', () => {
      console.log('ws connect ok');
      resolve();
    });
  });

}

module.exports = {
  connect
};

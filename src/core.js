
const WebSocket = require('ws');

const rpc = require('./rpc');

const EDGE_CORE_URL = process.env.RIC_EDGE_URL || 'ws://localhost:17080/zigbee';

async function connect () {
  const ws = new WebSocket(EDGE_CORE_URL);

  ws.on('message', async data => {
    const result = await rpc.dispatch(data);
    ws.send(JSON.stringify(result));
  });

  return new Promise((resolve, reject) => {
    ws.on('error', reject);

    ws.on('open', () => {
      console.log('ws connect ok');
      resolve(ws);
    });
  });
}

module.exports = {
  connect
};

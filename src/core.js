/**
 * 
 * Copyright 2019 Rightech IoT. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const WebSocket = require('ws');

const rpc = require('./rpc');

const EDGE_CORE_URL = process.env.RIC_EDGE_URL || 'ws://localhost:17080/zigbee';

async function connect() {
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

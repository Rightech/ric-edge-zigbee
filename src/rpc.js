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

const { listDevices, permitJoin, readAttribute, writeAttribute, runCommand } = require('./zigbee');

function error(req, message, code = -32603) {
  return {
    jsonrpc: '2.0',
    id: req.id || null,
    error: {
      code,
      message
    }
  };
}

function ok(req, result = { ok: true }) {
  return {
    jsonrpc: '2.0',
    id: req.id || null,
    result
  };
}

const methods = {
  'zigbee-list-devices': listDevices,
  'zigbee-permit-join': permitJoin,
  'zigbee-read': readAttribute,
  'zigbee-write': writeAttribute,
  'zigbee-command': runCommand
};

async function dispatch(request) {
  try {
    request = JSON.parse(request.toString());
  } catch (err) {
    return error(request, 'Parse error', -32700);
  }
  const method = methods[request.method];
  if (!method) {
    return error(request, 'Method not found', -32601);
  }
  try {
    const result = await method(request.params);
    return ok(request, result);
  } catch (err) {
    console.log('rpc err', err);
    return error(request, err.toString(), -32603);
  }
}

module.exports = {
  dispatch
};

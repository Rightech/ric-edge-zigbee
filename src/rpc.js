
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

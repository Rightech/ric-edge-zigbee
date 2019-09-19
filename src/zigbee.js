
const slugify = require('slugify');

const SERIAL_PATH = process.env.ZIGBEE_SERIAL_PATH || '/dev/ttyACM0';

const zigbee = new (require('zigbee-shepherd'))(SERIAL_PATH, {
  dbPath: './dev.db'
});

zigbee.on('ind', msg => {
  zigbee.consoleLog && console.log(new Date(), 'msg', msg);
});

async function init () {
  await zigbee.start();
  console.log('zigbee start ok');
  console.log('zigbee devices:', zigbee.list());

  return zigbee;
}

function deviceId (device) {
  return slugify(device.modelId || device.ieeeAddr, { lower: true, replacement: '_' });
}

function findEndpoint (ieeeAddr, endpointId = 1) {
  const device = zigbee.list().find(item => item.ieeeAddr === ieeeAddr);
  if (!device) {
    throw new Error('Device not found');
  }
  endpointId = +endpointId;
  const endpoint = zigbee.find(device.ieeeAddr, endpointId);
  if (!endpoint) {
    throw new Error('Endpoint not found');
  }
  return endpoint;
}

async function listDevices () {
  const devices = zigbee.list().reduce((acc, dev) => {
    const modelId = deviceId(dev);
    acc[modelId] = {
      addr: dev.ieeeAddr,
      type: dev.type,
      manufName: dev.manufName,
      modelId: dev.modelId
    };
    if (dev.type === 'EndDevice') {
      acc[modelId].endpoints = dev.epList;
    }
    return acc;
  }, {});

  return { devices };
}

async function permitJoin ({ seconds = 30, wait }) {
  seconds = +seconds;

  return zigbee.permitJoin(seconds);
}

async function readAttribute ({ device, endpoint = 1, cluster, attribute }) {
  endpoint = findEndpoint(device, endpoint);
  return endpoint.read(cluster, attribute);
}

async function writeAttribute ({ device, endpoint = 1, cluster, attribute, value }) {

}

async function runCommand ({ device, endpoint = 1, cluster, command, payload = {} }) {
  endpoint = findEndpoint(device, endpoint);
  return endpoint.functional(cluster, command, payload);
}

module.exports = {
  init,

  listDevices,
  permitJoin,
  readAttribute,
  writeAttribute,
  runCommand
};

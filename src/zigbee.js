
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

const slugify = require('slugify');

const SERIAL_PATH = process.env.ZIGBEE_SERIAL_PATH || '/dev/ttyACM0';

const zigbee = new (require('zigbee-shepherd'))(SERIAL_PATH, {
  dbPath: './dev.db'
});

zigbee.on('ind', msg => {
  zigbee.consoleLog && console.log(new Date(), 'msg', msg);
});

async function init() {
  await zigbee.start();
  console.log('zigbee start ok');
  console.log('zigbee devices:', zigbee.list());

  return zigbee;
}

function deviceId(device) {
  return slugify(device.modelId || device.ieeeAddr, { lower: true, replacement: '_' });
}

function findEndpoint(ieeeAddr, endpointId = 1) {
  const device = zigbee.list().find(item => item.ieeeAddr === ieeeAddr);
  if (!device) {
    throw new Error('Device not found');
  }
  const endpoint = zigbee.find(device.ieeeAddr, +endpointId);
  if (!endpoint) {
    throw new Error('Endpoint not found');
  }
  return endpoint;
}

async function listDevices() {
  const devices = zigbee.list().reduce((acc, dev) => {
    const id = deviceId(dev);
    acc[id] = {
      addr: dev.ieeeAddr,
      type: dev.type,
      manufName: dev.manufName,
      modelId: dev.modelId
    };
    if (dev.type === 'EndDevice') {
      acc[id].endpoints = dev.epList;
    }
    return acc;
  }, {});
  return { devices };
}

async function permitJoin({ seconds = 30, wait }) {
  return zigbee.permitJoin(+seconds);
}

async function readAttribute({ device, endpoint = 1, cluster, attribute }) {
  return findEndpoint(device, endpoint).read(cluster, attribute);
}

async function writeAttribute({ device, endpoint = 1, cluster, attribute, value }) {
  return findEndpoint(device, endpoint).read(cluster, attribute, value);
}

async function runCommand({ device, endpoint = 1, cluster, command, payload = {} }) {
  return findEndpoint(device, endpoint).functional(cluster, command, payload);
}

module.exports = {
  init,

  listDevices,
  permitJoin,
  readAttribute,
  writeAttribute,
  runCommand
};

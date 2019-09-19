
const SERIAL_PATH = process.env.ZIGBEE_SERIAL_PATH || '/dev/ttyACM0';

const { Controller } = require('zigbee-herdsman')

const zigbee = new Controller({
  databasePath: './dev-v2.db',
  serialPort: { path: SERIAL_PATH }
});


async function init() {
  zigbee.on('deviceAnnounce', x => {
    console.log('deviceAnnounce', x);
  });

  zigbee.on('deviceLeave', x => {
    console.log('deviceLeave', x);
  });

  zigbee.on('deviceJoined', x => {
    console.log('deviceJoined', x);
  });

  zigbee.on('adapterDisconnected', x => {
    console.log('adapterDisconnected', x);
  });

  zigbee.on('deviceInterview', x => {
    console.log('deviceInterview', x);
  });

  zigbee.on('message', x => {
    console.log('message', x);
  });

  await zigbee.start();
  console.log('zigbee start ok');

  return zigbee;
}


module.exports = {
  init,
  //permitJoin
};

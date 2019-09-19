
const SERIAL_PATH = process.env.ZIGBEE_SERIAL_PATH || '/dev/ttyACM0';

const zigbee = new (require('zigbee-shepherd'))(SERIAL_PATH, {
  dbPath: './dev.db'
});


zigbee.on('ind', msg => {
  console.log(new Date(), 'msg', msg);
});


async function permitJoin(sec = 30) {
  zigbee.permitJoin(sec, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

async function init() {
  await zigbee.start();
  console.log('zigbee start ok');
  console.log('zigbee devices:', zigbee.list());

  return zigbee;
}


module.exports = {
  init,
  permitJoin
};

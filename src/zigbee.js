
const SERIAL_PATH = process.env.ZIGBEE_SERIAL_PATH || '/dev/ttyACM0';

const zigbee = new (require('zigbee-shepherd'))(SERIAL_PATH, {
  dbPath: './dev.db'
});


zigbee.on('ind', msg => {
  console.log(new Date(), 'msg', msg);
});


async function permitJoin() {
  const sec = 60;
  zigbee.permitJoin(sec, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

async function init() {
  return new Promise((resolve, reject) => {
    zigbee.start(err => {
      if (err) {
        console.log('zigbee start err:', err);
        reject(err);
      }
    });

    zigbee.on('ready', () => {
      console.log('zigbee start ok');
      console.log('zigbee devices:', zigbee.list());

      resolve();
    });
  })
}


module.exports = {
  init,
  permitJoin
};

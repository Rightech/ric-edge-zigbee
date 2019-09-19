

const zigbee = require('./src/zigbee');
const core = require('./src/core');


async function main() {
  await zigbee.init();
  await core.connect();
}

main();

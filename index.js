

const repl = require('./src/repl');

async function main() {
  const zigbee = await require('./src/zigbee').init();
  const core = await require('./src/core').connect();

  repl.start({ 
    zigbee,
    core
  });
}

main();

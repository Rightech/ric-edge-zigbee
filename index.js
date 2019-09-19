
async function main () {
  const zigbee = await require('./src/zigbee').init();
  const core = await require('./src/core').connect();

  if (process.argv.includes('--repl')) {
    const repl = require('./src/repl');
    repl.start({ zigbee, core });
  }
}

main().catch(err => {
  console.log('main err:', err);
  process.exit(1);
});



function start(context = {}) {
  const stubber = require('async-repl/stubber');
  const repl = require('repl').start({ prompt: '> ' });

  stubber(repl);

  Object.assign(repl.context, context);

  return repl;
}

module.exports = {
  start
};

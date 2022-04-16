const cmds = require('../utils/getCmds.js');

const parse = (client, globals, msg) => {
  const args = msg.content.substring(2).split(' ').filter(
    (str) => str !== ' ' && str !== ''
  );
  const command = args[0];

  if (cmds[command]) {
    cmds[command].run(client, globals, args.slice(1), msg);
  }
}

module.exports = parse;

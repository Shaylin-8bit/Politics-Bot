const fs = require('fs');

const result = {};
const commandDir = './commands';

fs.readdirSync(commandDir)
  .filter(
    (file) => file.endsWith('.js')
  ).forEach(
    (file) => {
      const command = require(`.${commandDir}/${file}`);
      result[command.name] = command;
    }
  );

module.exports = result;
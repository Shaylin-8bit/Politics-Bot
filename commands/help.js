//const commands = require('../components/commands.js');

const command = {
  name: 'help',
  category: 'info',
  description: 'get a list of all commands',
  cache: [], 
  
  run: (msg, args, globals, bot) => {
    let reply = '**Commands**\n\`\`\`';
    for (let command in bot.commands) {
      com = bot.commands[command];
      reply += `\n${com.name}: ${com.description}`;
    }
    reply += '\n\`\`\`';
    msg.channel.send({content: reply});
  }
};

module.exports = command;

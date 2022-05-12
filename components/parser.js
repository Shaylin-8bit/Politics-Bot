const hasPerm = require('../utils/hasPerm.js');

const parse = async (bot, db, msg) => {
  const args = msg.content.substring(2).split(' ').filter(
    (str) => str !== ' ' && str !== ''
  );
  const command = bot.commands[args[0]];

  if (command) {
    const perm = hasPerm(bot.globals.permissions, msg.member, command);
    
    if (perm || msg.guild.ownerId === msg.author.id) {
      await command.run(msg, args.slice(1), bot.globals, bot);
      for (let attribute of command.cache) {
        const result = await db.setGlobals(attribute, bot.globals);
        if (result) msg.channel.send({
          content: `ERR: '${attribute}' does not exist in DB`
        });
      }
    } else {
      msg.channel.send({
        content: 'Missing permissions...'
      });
    }
  } else {
    msg.channel.send({
      content: `'${args[0]}' not found...`
    });
  }
}

module.exports = parse;

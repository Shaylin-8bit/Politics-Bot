const command = {
  name: 'seeperms',
  category: 'admininstration',
  description: 'See a roles perms',
  cache: [], 

  run: (msg, args, globals, bot) => {
    if (!args.length) {
      msg.channel.send({content: 'You forgot to mention a role!'});
    }   
    const roleObj = msg.mentions.roles.first() || msg.guild.roles.cache.find(r => r.id === args[0]);
    const role = roleObj ? roleObj.name : 'Invalid Role';
    
    const perms = globals.permissions[role];
    let reply;

    if (perms) {
      reply = `${role} permissions:\n`;
      perms.forEach(
        perm => reply += `\t${perm}\n`
      );
    } else {
      reply = `${role} has no bot permissions.`;
    }

    msg.channel.send({content: reply});
  }
};

module.exports = command;
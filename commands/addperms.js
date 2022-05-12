const command = {
  name: 'addperms',
  category: 'administration',
  description: 'add permissions to a role',
  cache: ['permissions'], 
  
  run: (msg, args, globals, bot) => {
    if (args.length < 2) {
      msg.channel.send({content: 'Missing args :('});
      return;
    } 
    const roleObj = msg.mentions.roles.first() || msg.guild.roles.cache.find(r => r.id === args[0]);
    if (!roleObj) {
      msg.channel.send({content: 'Invalid Role'});
      return;
    }

    const role = roleObj.name;
    const perms = args.splice(1);
    let lst = globals.permissions[role];

    if (lst) {
      perms.forEach(
        perm => {
          if (!lst.includes(perm)) lst.push(perm);
        }
      )
    } else {
      globals.permissions[role] = perms;
    }
    reply = `Added perms to ${role}\n`;
    perms.forEach(
      perm => reply += (`\t${perm}\n`)
    );
    msg.channel.send({content: reply});
  }
};

module.exports = command;

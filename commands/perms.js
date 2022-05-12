const command = {
  name: 'perms',
  category: 'info',
  description: 'see your perms',
  cache: [], 
  
  run: (msg, args, globals, bot) => {
    const member = msg.member;
    const perms = member.roles.cache.map(
      (role) => {
        if (globals.permissions[role.name]) {
          return globals.permissions[role.name];
        }
      }
    ).reduce(
      (n, lst) => n.concat(lst.filter(
        role => !n.includes(role)
      ))
    ).reduce(
      (n, perm) => n + `\n${perm}`
    );

    const reply = `**Permissions**\n\`\`\`\n${perms}\`\`\``;
    msg.channel.send({content: reply});
      
  }
}

module.exports = command;

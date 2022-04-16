const command = {
  // command name
  name: 'command name',

  category: 'type of command',
  
  // first 64 chars shown by default
  description: 'command description',

  // if command requires globals cache
  requiresCache: false, 

  // function to run
  run: (client, globals, args, ctx) => {}
};

module.exports = command;
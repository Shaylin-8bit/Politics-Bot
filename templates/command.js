const command = {
  // command name
  name: 'ping',

  // command type
  category: 'utility',

  // description shown in help features
  description: 'get bot latency',

  // list of database attributes that need to be cached
  cache: [], 

  // command to run
  run: (msg, args, globals, bot) => {
    msg.channel.send({content: 'pong!'});    
  }
};

// export of command
module.exports = command;

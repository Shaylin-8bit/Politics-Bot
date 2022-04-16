const command = {
  name: 'ping',
  category: 'utility',
  description: 'get bot latency',
  requiresCache: false, 
  
  run: (client, globals, args, ctx) => {
    ctx.channel.send({content: 'pong!'});    
  }
};

module.exports = command;
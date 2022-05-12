const command = {
  name: 'ping',
  category: 'utility',
  description: 'get bot latency',
  cache: [], 
  
  run: (msg, args, globals, bot) => {
    msg.channel.send({content: 'pong!'});    
  }
};

module.exports = command;

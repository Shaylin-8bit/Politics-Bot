const { Client, Intents } = require('discord.js');
const parser = require('./components/parser.js');
const globals = null;

const prefix = 'p!';

const client = new Client(
  { intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS
  ] 
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {
  if (msg.content.substring(0, 2) === prefix) {
    parser(client, globals, msg);
  }
});

client.login(process.env.BOT_TOKEN);
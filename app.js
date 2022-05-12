// imports
console.log('importing modules...');
const { Client, Intents } = require('discord.js');
console.log('importing components...');
const parser = require('./components/parser.js');
const database = require('./components/database.js');
const commands = require('./components/commands.js');
console.log('importing config file...');
const config = require('./config.js');

console.log('setting variables...');
// variables
const prefix = config.prefix;
const globals = {};
let db;

const client = new Client(
  { intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS
  ] 
});

const bot = {
  db: db,
  commands: commands,
  globals: globals,
  client: client,
};


// client set up
client.on('ready', () => {
  console.log(`\nLogged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {
  if (msg.content.substring(0, 2) === prefix) {
    parser(bot, db, msg);
  }
});


// start function
const start = async () => {
  console.log('app starting...');
  console.log('grabbing database...');
  
  db = await database.getDB();

  console.log('grabbing globals...');

  for (let attribute of db.attributes) {
    console.log(`\t${attribute}`);
    globals[attribute] = await db.getGlobals(attribute);
  }

  console.log(globals);
  console.log('logging in...');
  
  client.login(process.env.BOT_TOKEN);
};


// start bot
start();

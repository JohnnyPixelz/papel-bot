const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const schedule = require('./schedule.js');
client.commands = new Discord.Collection();

module.exports.client = client;

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Event Initialization
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  schedule.setup();
});

// Command Handling
client.on('message', msg => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot || msg.channel.type === "dm") return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
  }
});

// Connecting with discord
client.login(config.token); // token via config.json
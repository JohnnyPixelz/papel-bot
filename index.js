const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const fs = require('fs');
client.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Event Initialization
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
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
client.login(process.env.BOT_TOKEN); // BOT_TOKEN is set by heroku at runtime
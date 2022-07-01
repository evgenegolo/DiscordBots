//require block
const { REST } = require('@discordjs/rest');
const { Routes, Collection ,Client, Intents } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

//getting env info
require("dotenv").config();
const mySecret = process.env['TOKEN'];

//declaring consts
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//excute block
client.commands = new Collection();

for(const file of commandsFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    client.commands.set(command.data.name ,command);
}


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
   //const command = client.commands.get(interaction.commandName);
  const command = client.commands.get(interaction.commandName);
  
  if(!command) return;

  try {
		await command.execute(interaction);
	}catch(error){
    console.error(error)
    await interaction.reply({content : 'There was an error while executing this command!',  ephemeral:true});
  }

});

client.login(mySecret)
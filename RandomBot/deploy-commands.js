//require block
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const path = require('node:path');

//getting env info
require("dotenv").config();
const guildId = process.env['GUILDID'];
const clientId = process.env['CLIENTID']
const token = process.env['TOKEN'];

//declaring consts
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//excute block
for(let file of commandFiles){
	let filePath = path.join(commandsPath , file);
	let command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
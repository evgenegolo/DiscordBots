import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config(); 

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
    ]
});

client.on('ready',() => {
    console.log("the bot is redy");
});

client.on('messageCreate',(message) => {
    if(message.content === "ping")
    {
        message.reply({
            content:"pong",
        });
    }
});

client.login(process.env.TOKEN);



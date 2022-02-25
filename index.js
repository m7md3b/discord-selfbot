const { Client, Intents} = require("djs-selfbot");
const SelfDiscord = require("djs-selfbot");
const Userclient = new SelfDiscord.Client({ intents: [
    Intents.FLAGS.DIRECT_MESSAGES, 
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
],
partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const config = require('./config.json');

const { Telegraf } = require('telegraf');
const TelApp = new Telegraf(config.TelegramToken);

Userclient.on('ready', () => {
	console.log('UserCliant is Ready');
	Userclient.user.setStatus('invisible');
});

Userclient.on("messageCreate", (message) => {
    if (message.channel.type == 'DM') {       
    TelApp.telegram.sendMessage(config.TelegramDMsChannel, `NEW DM: from ${message.author.tag}\n\nMessage Content:\n${message.content}\n\nMessage URL:\n${message.url}`)
		.catch(console.err)       
    }
    if (message.content.includes(Userclient.user.id)){
        TelApp.telegram.sendMessage(config.TelegramDMsChannel, `NEW Mention: from ${message.author.tag} in ${message.guild.name}\n\nMessage Content:\n${message.content}\n\nMessage URL:\n${message.url}`)
		.catch(console.err)  
    }


}); 

Userclient.login(config.USERTOKEN);
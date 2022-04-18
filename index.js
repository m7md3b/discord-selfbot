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
        if (message.author.id === (Userclient.user.id)) return;     
		UserclientTelApp.telegram.sendMessage(config.TelegramDMsChannel, `${message.author.tag}: ${message.content}`)
		.catch(error => {console.error(error);});       
    }
    if (message.content.includes(Userclient.user.id)){
		let mContent = message.content;
  if (mContent.includes(Userclient.user.id)) mContent = mContent.replace(Userclient.user.id, '3ba')
        UserclientTelApp.telegram.sendMessage(config.TelegramMentionsChannel, `${message.author.tag} - ${message.guild.name}: ${mContent}`)
		.catch(error => {console.error(error);}); 
    }
});

Userclient.login(config.USERTOKEN);

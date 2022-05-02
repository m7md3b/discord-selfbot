// discord client
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

// config file
const config = require('./config.json'); 

// telegraf package
const { Telegraf } = require('telegraf');
const TelApp = new Telegraf(config.TelegramToken);

Userclient.on('ready', () => {
	console.log('UserCliant is Ready');
	Userclient.user.setStatus('invisible'); // online, idle, invisible, dnd
});
 
Userclient.on("messageCreate", (message) => {
    if (message.channel.type == 'DM') {  
        if (message.author.id === (Userclient.user.id)) return;    	
        
        let mContent = message.content.replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)').replace(/\~/g, '\\~').replace(/\`/g, '\\`').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\-/g, '\\-').replace(/\=/g, '\\=')
            .replace(/\|/g, '\\|').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\./g, '\\.').replace(/\!/g, '\\!')

        let mAuthor = message.author.tag.replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)').replace(/\~/g, '\\~').replace(/\`/g, '\\`').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\-/g, '\\-').replace(/\=/g, '\\=')
            .replace(/\|/g, '\\|').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\./g, '\\.').replace(/\!/g, '\\!');

        UserclientTelApp.telegram.sendMessage(config.TelegramDMsChannel, `*${mAuthor}:* ${mContent}`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "🍁", url: message.url } ]
                    ]
                }, 
                parse_mode: 'MarkdownV2'
            })
            .catch(error => {console.error(error);});       
    }

    if (message.content.includes(Userclient.user.id)){

    let mContent = message.content.replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)').replace(/\~/g, '\\~').replace(/\`/g, '\\`').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\-/g, '\\-').replace(/\=/g, '\\=')
        .replace(/\|/g, '\\|').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\./g, '\\.').replace(/\!/g, '\\!')
        .replace(`<@${Userclient.user.id}\\>`, `*${Userclient.user.username}*`).replace(`<@!${Userclient.user.id}\\>`, `*${Userclient.user.username}*`);

    let mAuthor = message.author.tag.replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)').replace(/\~/g, '\\~').replace(/\`/g, '\\`').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\-/g, '\\-').replace(/\=/g, '\\=')
        .replace(/\|/g, '\\|').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\./g, '\\.').replace(/\!/g, '\\!');
    
    let mGuild = message.guild.name.replace(/\_/g, '\\_').replace(/\#/g, '\\#').replace(/\*/g, '\\*').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)').replace(/\~/g, '\\~').replace(/\`/g, '\\`').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\-/g, '\\-').replace(/\=/g, '\\=')
        .replace(/\|/g, '\\|').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\./g, '\\.').replace(/\!/g, '\\!');

        UserclientTelApp.telegram.sendMessage(config.TelegramMentionsChannel, `*${mAuthor}* \\- ${mGuild}: ${mContent}`,
           {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "🍁", url: message.url } ]
                    ]
                }, 
                parse_mode: 'MarkdownV2'
            })
            .catch(error => {console.error(error);}); 
    }
});

Userclient.login(config.USERTOKEN);

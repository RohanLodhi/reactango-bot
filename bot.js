const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();
const data  = require('./leaderboard.data');

data.sort((a,b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? +1 : 0));

client.on("ready", () => {
  console.log("I am ready!");
});

const limiter = rank => {
    idx = data.indexOf(rank);
    if(idx > 10){
        return rank;
    }
    return rank;
}

const prefix = "!";
client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix) || message.author.bot) return;
 
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  } 
  else if (message.content.startsWith(prefix + "reactango")) {
    let msg = message.content;
    msg = msg.replace('!reactango','');
    msg = msg.replace(/ /g, '');
    console.log(msg)
    if(msg === 'leaderboard'){
        message.channel.send('leaderboard coming right up!');
        
        let leaderboard = [];
        let i=1;

        data.filter(limiter).map((data) => {
            leaderboard.push(`${i}. ${data.name}:    ${data.points}`);
            i+=1;
        })
        message.channel.send({embed: {
          color: 3447003,
          title: "Leaderboard",
          url: "https://reactango.tk#leaderboard",
          description: "Leaderboard for #weeklychallenges",
          fields: [{
            name: leaderboard
          }],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© litomayez"
          }
        }
      });
    }
    else if(msg === 'website'){
      message.channel.send({embed: {
        color: 3447003,
        title: "Website",
        url: "https://reactango.tk",
        description: "Website for #weeklychallenges",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© litomayez"
        }
      }
    });
    }
    else if(msg === 'help'){
      message.channel.send({embed: {
        color: 3447003,
        title: "Commands",
        description: "This is a list of commands you can use.",
        fields: [{
            name: "!reactango leaderboard",
            value: "This will give the leaderboard of the #weeklychallenges ."
          },
          {
            name: "!reactango website",
            value: "This sends you a link to the coding challenges' website."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© litomayez"
        }
      }
    });
    }
    else if(msg.includes('submission')){
      message.channel.send('submitted!')
    }
    else{
        message.channel.send("I don't know what you're looking for. Use **!reactango help** for the list of commands.");
    }
  }
});

client.login(process.env.TOKEN);
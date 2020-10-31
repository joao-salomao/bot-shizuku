require('dotenv').config();
const Discord = require("discord.js");
const {
  sendPicture,
  suggestAnime,
  search
} = require("./events/message");
const { setActivity } = require("./config/setup");
const client = new Discord.Client();

client.on("ready", () => {
  setActivity(client);
});

client.on("message", msg => {
  setActivity(client);

  if (msg.author.bot) return;

  const content = msg.content.toLocaleLowerCase();

  if (content === "sh!cat") {
    return sendPicture(msg, 'cat');
  }

  if (content === "sh!dog") {
    return sendPicture(msg, 'dog');
  }

  if (content === "sh!anime suggestion") {
    return suggestAnime(msg);
  }

  if (content.includes("sh!search")) {
    return search(msg, content);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

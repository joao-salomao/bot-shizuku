const Discord = require("discord.js");
const {
    initData,
    sendCatPicture,
    suggestAnime
} = require('./events/message')
const {
  setActivity
} = require('./config/botConfig')
const client = new Discord.Client();

client.on("ready", () => {
  setActivity(client)
  initData();
});

client.on("message", msg => {
  setActivity(client)

  if (msg.author.bot) return;

  const content = msg.content.toLocaleLowerCase()

  if (content === "sh!cat") {
    sendCatPicture(msg);
  }

  if (content === "sh!anime suggestion") {
    suggestAnime(msg);
  }
});

client.login("NjgxOTYxODY3NzE5MzQ0MTgx.XlWFAQ.Iql3XKv-zgLmscqmfCafMWGSuWA");

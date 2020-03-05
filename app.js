const Discord = require("discord.js");
const {
  initData,
  sendCatPicture,
  suggestAnime,
  search
} = require("./events/message");
const { setActivity } = require("./config/botConfig");
const client = new Discord.Client();

client.on("ready", () => {
  setActivity(client);
  initData();
});

client.on("message", msg => {
  setActivity(client);

  if (msg.author.bot) return;

  const content = msg.content.toLocaleLowerCase();

  if (content === "sh!cat") {
    return sendCatPicture(msg);
  }

  if (content === "sh!anime suggestion") {
    return suggestAnime(msg);
  }

  // if (content.includes("sh!search")) {
  //   return search(msg, content);
  // }
});

client.login("NjgxOTYxODY3NzE5MzQ0MTgx.XlWFAQ.Iql3XKv-zgLmscqmfCafMWGSuWA");
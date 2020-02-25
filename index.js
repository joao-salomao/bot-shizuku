const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.author.bot) return;

  if (
    msg.content.toLocaleLowerCase().includes("<@&681963238602178591> gatinho")
  ) {
    sendCatPicture(msg)
  }
});

client.login("NjgxOTYxODY3NzE5MzQ0MTgx.XlWFAQ.Iql3XKv-zgLmscqmfCafMWGSuWA");

async function sendCatPicture(message) {
  const response = await axios.get(
    "https://pixabay.com/api/?key=15390583-f0d2e1b4c8c96b27978676e4e&q=cats&image_type=photo"
  );
  const url =
    response.data.hits[Math.floor(Math.random() * response.data.hits.length)]
      .largeImageURL;

  message.reply("a cute cat for you", {
    files: [url]
  });
}

const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.author.bot) return;

  if (msg.content.toLocaleLowerCase() === "sh!cat") {
    sendCatPicture(msg);
  }
});

client.login("NjgxOTYxODY3NzE5MzQ0MTgx.XlWFAQ.Iql3XKv-zgLmscqmfCafMWGSuWA");

async function sendCatPicture(message) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=15390583-f0d2e1b4c8c96b27978676e4e&q=gato&image_type=photo&per_page=200`
  );
  
  const index = Math.floor(Math.random() * response.data.hits.length);
  const url = response.data.hits[index].largeImageURL;

  message.reply("a cute cat for you", {
    files: [url]
  });
}

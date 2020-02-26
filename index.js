const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

const data = {
  animesIDs: [],
};

client.on("ready", () => {
  initData();
});

client.on("message", msg => {
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

async function suggestAnime(message) {
  const index = Math.floor(Math.random() * data.animesIDs.length);
  const response = await axios.get(`https://api.jikan.moe/v3/anime/${data.animesIDs[index]}`);
  const { title, image_url, synopsis } = response.data;
  const embed = new Discord.RichEmbed()
    .setColor("#1f94b8")
    .setTitle(title)
    .setDescription(synopsis)
    .setImage(
      image_url != null
        ? image_url
        : "https://i.ytimg.com/vi/_NXrTujMP50/maxresdefault.jpg"
    )
  message.channel.send(embed);
}

async function initData() {
  const response1 = await axios.get(
    "https://api.jikan.moe/v3/user/moonbox/animelist/all/1"
  );
  const response2 = await axios.get(
    "https://api.jikan.moe/v3/user/moonbox/animelist/all/2"
  );

  data.animesIDs = response1.data.anime.map(anime => anime.mal_id)
  data.animesIDs = data.animesIDs.concat(response2.data.anime.map(anime => anime.mal_id))
}

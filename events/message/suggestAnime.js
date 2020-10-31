const axios = require("axios");
const Discord = require("discord.js");

const data = {
  animesIDs: []
};

(async () => {
  const response1 = await axios.get(
    "https://api.jikan.moe/v3/user/moonbox/animelist/all/1"
  );
  const response2 = await axios.get(
    "https://api.jikan.moe/v3/user/moonbox/animelist/all/2"
  );

  data.animesIDs = response1.data.anime.map(anime => anime.mal_id);
  data.animesIDs = data.animesIDs.concat(
    response2.data.anime.map(anime => anime.mal_id)
  );
})()

const suggestAnime = async message => {
  try {
    const index = Math.floor(Math.random() * data.animesIDs.length);
    const response = await axios.get(
      `https://api.jikan.moe/v3/anime/${data.animesIDs[index]}`
    );
    const { title, image_url, synopsis } = response.data;
    const embed = new Discord.RichEmbed()
      .setColor("#1f94b8")
      .setTitle(title)
      .setDescription(synopsis)
      .setImage(
        image_url != null
          ? image_url
          : "https://i.ytimg.com/vi/_NXrTujMP50/maxresdefault.jpg"
      );
    message.channel.send(embed);
  } catch (error) {
    message.reply("Algo deu errado, tente novamente >.<");
  }
};

module.exports = suggestAnime

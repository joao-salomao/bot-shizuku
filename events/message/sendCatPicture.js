const axios = require("axios");

const sendCatPicture = async message => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=15390583-f0d2e1b4c8c96b27978676e4e&q=gato&image_type=photo&per_page=200`
  );

  const index = Math.floor(Math.random() * response.data.hits.length);
  const url = response.data.hits[index].largeImageURL;

  message.reply("a cute cat for you", {
    files: [url]
  });
};

module.exports = sendCatPicture

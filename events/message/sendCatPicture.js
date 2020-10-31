const axios = require("axios");

const sendCatPicture = async message => {
  const url = 'https://api.thecatapi.com/v1/images/search'
  const resp = await axios.get(url, {
    headers: {
      "x-api-key": process.env.THE_CAT_API_KEY
    }
  });
  const pictureUrl = resp.data[0].url

  message.reply("a cute cat for you", {
    files: [pictureUrl]
  });
};

module.exports = sendCatPicture

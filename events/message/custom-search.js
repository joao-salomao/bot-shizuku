const { google } = require("googleapis");
const customSearch = google.customsearch("v1");

const search = async (message, q) => {
  let isPhoto = false;
  const options = {
    auth: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_CX,
    num: 10
  };

  if (q.includes("--photo")) {
    options.searchType = "image";
    options.imgType = "photo";
    isPhoto = true;
  }

  // let keyWords = "";

  // q.forEach(str => {
  //   if (str != "sh!search" && str != "--photo") {
  //     keyWords = keyWords + " " + str;
  //   }
  // });

  options.q = "gato fofinho";

  try {
    const resp = await customSearch.cse.list(options);
    const item = resp.data.items[0];

    if (isPhoto) {
      message.reply(item.title ? item.title : q, {
        files: [item.link]
      });
    } else {
      message.reply('teste aaa')
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = search
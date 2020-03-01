const config = require("../config/appConfig");
const { google } = require("googleapis");
const customSearch = google.customsearch("v1");

const search = async (message, q) => {
    let isPhoto = false
    const options = {
      auth: config.googleApiKey,
      cx: config.googleCX,
      num: 10,
    };
  
    if (q.includes("--photo")) {
      options.searchType = "image";
      options.imgType = "photo";
      isPhoto = true
    }
  
    let keyWords = ""
  
    q.forEach(str => {
      if (str != "sh!search" && str != "--photo") {
        keyWords = keyWords + " " + str
      }
    });
  
    options.q = keyWords
  
    try {
      const resp = await customSearch.cse.list(options);
      const item = resp.data.items[0];
      console.log(item)
  
      if (isPhoto) {
      message.reply(item.title ? item.title : q, {
        files: [item.link]
      });
      }
    
    } catch (error) {
      console.error(error);
    }
  };

  
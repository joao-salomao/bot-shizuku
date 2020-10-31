const axios = require("axios");

const sendCatPicture = async message => {
    const headers = {
        "x-api-key": process.env.THE_CAT_API_KEY
    }

    const url = 'https://api.thecatapi.com/v1/images/search'
    const resp = await axios.get(url, { headers });

    const id = resp.data[0].id
    const pictureUrl = resp.data[0].url

    const pollTopic = await message.reply("a cute cat for you 🙃", {
        files: [pictureUrl]
    });

    // React picture
    pollTopic.react(`❤️`);
    pollTopic.react(`🤗`);
    pollTopic.react(`😧`);

    // Create a reaction collector
    const filter = (reaction) => reaction.emoji.name === '❤️' || reaction.emoji.name === `🤗`;
    const collector = pollTopic.createReactionCollector(filter, { time: 60000 });

    collector.on('end', collected => {
        // Voting on TheCatApi to get better results in the future
        if (collected.size > 0) {
            const url = 'https://api.thecatapi.com/v1/votes'
            axios.post(url, {
                image_id: id,
                value: 1
            }, { headers })
        }

        if (collected.size > 5) {
            message.channel.send("I think i'm doing a nice work, you don't think so ? 💖")
        }
    });
};


const sendDogPicture = async message => {
    const url = 'https://dog.ceo/api/breeds/image/random'
    const resp = await axios.get(url);
    const pictureUrl = resp.data.message

    message.reply("a cute dog for you 🙃", {
        files: [pictureUrl]
    });
};


const sendPicture = (message, type) => {
    if (type == 'cat') {
        sendCatPicture(message)
        return
    }

    sendDogPicture(message)
}

module.exports = sendPicture;
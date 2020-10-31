function setActivity(client) {
  const hour = new Date().getUTCHours();

  if (hour <= 12) {
    return client.user.setActivity("Lidando com os meus sentimentos pelo Haru", {
      type: "PLAYING"
    });
  }

  if (hour <= 18) {
    return client.user.setActivity("Tentando estudar", { type: "PLAYING" });
  }

  return client.user.setActivity("Tempo livre do Haru", { type: "PLAYING" });
}

module.exports = {
  setActivity
};

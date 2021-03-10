import client from "./twitch_init.js"
import bot from "../vk/vk_init.js"

function TWITCH(database) {
   client.connect()
      .then((data) => {
         console.log(`[TWITCH] Connect to ${data[0]}:${data[1]}`);
      }).catch((err) => {
         console.error(err);
      });

   client.on('message', (channel, tags, message, self) => {
      database.add("/messages", `${tags['display-name']}: ${message}`);
   });

   setInterval(async () => {
      let data = database.getData("/users");
      let message = database.getData("/messages");
      if (!data || !data.size || !message || !message.size) return;
      bot.sendMessage(Array.from(data), Array.from(message).reduce((result, current) => 
      `${result}
      
      ${current}`
      ));
      database.clear("/messages")
   }, 4000);
}

export default TWITCH
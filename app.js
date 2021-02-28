import client from "./twitch.js"
import bot from "./vk.js"
import Markup from "node-vk-bot-api/lib/markup.js"
import DB from "./db.js"

// let recipients = [287792387];

client.connect()
   .then((data) => {
      console.log(`[TWITCH] Connect to ${data[0]}:${data[1]}`);
   }).catch((err) => {
      console.error(err);
   });

bot.startPolling((err) => {
   if (err) {
      console.error(err);
   } else {
      console.log("[VK] Connect to server.")
   }
});

bot.use(async (ctx, next) => {
   try {
      await next();
   } catch (e) {
      console.error(e);
   }
});

client.on('message', (channel, tags, message, self) => {
   if (!DB || !DB.size) return;
   bot.sendMessage(Array.from(DB), `${tags['display-name']}: ${message}`);
});

bot.command('Начать', async (ctx) => {
   await ctx.reply("Привет, данный бот ретранслирует сообщения с твич канала [name]. Чтобы продолжить, нажми кнопку \"Транслировать\"", null,
   Markup.keyboard(['Транслировать']).oneTime());
});

bot.command('Транслировать', async (ctx) => {
   let user_id = ctx.message.user_id;
   DB.add(user_id);
   await ctx.reply("Начали транслирование:", null,
   Markup.keyboard(['Остановить']).oneTime());
})

bot.command('Остановить', async (ctx) => {
   let user_id = ctx.message.user_id;
   DB.delete(user_id);
   await ctx.reply("Остановили транслирование. Чтобы продолжить, нажми кнопку \"Транслировать\"", null,
   Markup.keyboard(['Транслировать']).oneTime());
})
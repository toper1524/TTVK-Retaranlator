import bot from "./vk_init.js"
import Markup from "node-vk-bot-api/lib/markup.js"

function VK(database) {
   bot.use(async (ctx, next) => {
      try {
         await next();
      } catch (e) {
         console.error(e);
      }
   });

   bot.command('Начать', async (ctx) => {
      await ctx.reply("Привет, данный бот ретранслирует сообщения с твич канала [name]. Чтобы продолжить, нажми кнопку \"Транслировать\"", null,
         Markup.keyboard(['Транслировать']).oneTime());
   });

   bot.command('Транслировать', async (ctx) => {
      let user_id = ctx.message.user_id;
      database.add('/users', user_id);
      await ctx.reply("Начали транслирование:", null,
         Markup.keyboard(['Остановить']).oneTime());
   })

   bot.command('Остановить', async (ctx) => {
      let user_id = ctx.message.user_id;
      database.delete('/users', user_id);
      await ctx.reply("Остановили транслирование. Чтобы продолжить, нажми кнопку \"Транслировать\"", null,
         Markup.keyboard(['Транслировать']).oneTime());
   })

   bot.startPolling((err) => {
      if (err) {
         console.error(err);
      } else {
         console.log("[VK] Connect to server.")
      }
   });
}

export default VK
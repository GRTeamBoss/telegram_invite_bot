import { Telegraf } from "telegraf";
import { Database } from "./database";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start(async (ctx) => ctx.reply(`Hello ${ctx.chat.username || ctx.chat.first_name}`));
bot.help(async (ctx) => ctx.reply('Send me Name and Surname in format like: /invite Jonh Doe'));
bot.hears(/invite [\w\W]+ [\w\W]+/, async (ctx) => {
  const {command, name, surname} = ctx.message.text.split(" ")
  let result = '';
  Array(new Database().data).forEach((item) => {
    if (name in item && surname in item) {
      result = `https://invite.com/?name=${name}&surname=${surname}`
    }
  })
  ctx.sendMessage(result)
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

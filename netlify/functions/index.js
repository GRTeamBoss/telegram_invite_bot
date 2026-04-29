import { Telegraf } from "telegraf";
import { Markup } from "telegraf";
import { Database } from "./database.js";
import { configDotenv } from "dotenv";

configDotenv({path: "./../../.env"})

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const sendPhone = Markup.keyboard([Markup.button.contactRequest("Send contact")])

const dataPhones = new Database().data

async function checkIfPhoneExists(phone) {
  let result = '';
  for (let i = 0; i < dataPhones.length; i++) {
    if (dataPhones[i].toString().includes(phone)) {
      result = `https://invite.com/?phone=${dataPhones[i]}`
    }
  }
  return result
}

async function sendPhoneLink(ctx, result) {
  if (result.length > 0) {
    await ctx.reply(result)
  } else {
    await ctx.reply('Wrong number!')
  }
}

bot.start(async (ctx) => await ctx.reply(`Hello ${ctx.chat.username || ctx.chat.first_name}`, sendPhone));
bot.help(async (ctx) => await ctx.reply('Send me number in format like: /invite [+998xxYYYxxYY] or [998xxYYYxxYY] or [xxYYYxxYY]'));
bot.hears(/invite \+?[\d]{9,12}$/, async (ctx) => {
  const commandSplitted = ctx.message.text.split(" ")
  const phone = commandSplitted[1]
  let result = await checkIfPhoneExists(phone);
  await sendPhoneLink(ctx, result)
})
bot.on('contact', async (ctx) => {
  const phone = ctx.message.contact.phone_number;
  let result = await checkIfPhoneExists(phone);
  await sendPhoneLink(ctx, result)
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

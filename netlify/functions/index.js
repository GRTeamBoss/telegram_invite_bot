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
    for (let j = 0; j < dataPhones[i].length; j++) {
      if (dataPhones[i][j]["тел ракам"] !== null) {
        if (dataPhones[i][j]["тел ракам"].toString().replaceAll("-", "").includes(phone)) {
          result = `https://invite.com/?phone=${dataPhones[i][j]["тел ракам"].toString().replaceAll("-", "")}`
        }
      }
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
bot.help(async (ctx) => await ctx.reply('Send me number in format like: /invite [xxYYYxxYY]'));
bot.hears(/invite \+?[\d]{9}$/, async (ctx) => {
  const commandSplitted = ctx.message.text.split(" ")
  const phone = commandSplitted[1]
  let result = await checkIfPhoneExists(phone);
  await sendPhoneLink(ctx, result)
})
bot.on('contact', async (ctx) => {
  const phone = ctx.message.contact.phone_number.slice(3);
  let result = await checkIfPhoneExists(phone);
  await sendPhoneLink(ctx, result)
})

exports.handler = async function(event, context) {
  await bot.handleUpdate(JSON.parse(event.body))
  return {statusCode: 200, body: "OK"}
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

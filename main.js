import { Telegraf } from 'telegraf'

import { exchangeKeyboard, mainKeyboard } from './keyboard-main.js'

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

const rate = 26.9514

bot.start( ctx => {
    db[ctx.chat.id] = new Set()

    db[ctx.chat.id].add('USD')

    chats.add(ctx.chat.id)

    ctx.replyWithMarkdown(
      `*Національний Банк України.*\nПублічна інформація у формі відкритих даних.`, {
        reply_markup: {
          keyboard: mainKeyboard,
          resize_keyboard: true,
          one_time_keyboard: true,
        }
      }
    )
  }
)

bot.hears('Офіційний курс гривні до іноземних валют та банківських металів', async (ctx) => {
  ctx.replyWithMarkdown('*Офіційний курс гривні до іноземних валют та банківських металів*',
  {
    reply_markup: {
      keyboard: exchangeKeyboard,
      resize_keyboard: true,
      one_time_keyboard: true,
    }
  })
})

bot.hears('Назад', async (ctx) => {
  ctx.replyWithMarkdown('*Назад*', {
    reply_markup: {
      keyboard: mainKeyboard,
      resize_keyboard: true,
      one_time_keyboard: true,
    }
  })
})

bot.hears('Отримати курс гривні', async (ctx) => {
  sendlist(ctx.chat.id)
})

bot.launch()

import * as https from 'https'

let db = {}

let chats = new Set()

import cron from 'node-cron'

cron.schedule('0 16 * * *', () => {
  chats.forEach(x => sendlist(x))
});

function sendlist(chatId) {
  https.get('https://bank.gov.ua/NBU_Exchange/exchange?json', (res) => {
    const selected = db[chatId]

    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
          const result = JSON.parse(body)

          let message = "Ось актуальний курс на *" + result[0].StartDate + "*:\n\n"

          result.forEach(row => {

            if (selected.size > 0) {
              if (!selected.has(row.CurrencyCodeL)) {
                return
              }
            }

            const element = row.CurrencyCodeL + " - " + row.Amount + ", coef - " + (row.Amount/rate).toFixed(4) + "\n"
            message += element
          });

          bot.telegram.sendMessage(chatId, message, {
            reply_markup: {
              keyboard: mainKeyboard,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
            parse_mode: "Markdown"
          });
        } catch (error) {
            console.error(error.message);
        };
    });
  })  
}
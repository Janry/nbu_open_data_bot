const TelegramBot = require('node-telegram-bot-api');
const https = require('https')

let db = new Set()

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.onText(/\/reset/, (msg, match) => {
  db = new Set()

  sendlist(msg.chat.id, db)
});

bot.onText(/\/add (.+)/, (msg, match) => {
  const code = match[1].toUpperCase();

  db.add(code)
});

bot.onText(/\/delete (.+)/, (msg, match) => {
  const code = match[1].toUpperCase();

  db.delete(code)
});

bot.on('message', (msg) => {
  try {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Привіт, Друже! Ось актуальні курси:');

    sendlist(chatId, db)
  } catch (error) {
    console.error(error.stack)
    bot.sendMessage(chatId, error.stack);
  }
});

function sendlist(chatId, selected) {
  https.get('https://bank.gov.ua/NBU_Exchange/exchange?json', (res) => {

    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
          const result = JSON.parse(body)
          console.info(result)

          let message = result[0].StartDate + "\n\n"

          result.forEach(row => {

            if (selected.size > 0) {
              if (!selected.has(row.CurrencyCodeL)) {
                return
              }  
            }

            const element = row.CurrencyCodeL + " - " + row.Amount + "\n"
            message += element
          });
  
          bot.sendMessage(chatId, message);
        } catch (error) {
            console.error(error.message);
        };
    });
  })  
}
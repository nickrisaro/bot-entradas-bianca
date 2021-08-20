const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const VerificadorDeInscripciones = require("./verificadorDeInscripciones");

const port = process.env.PORT || 3000;

const url = process.env.URL || "";
const token = process.env.TOKEN || "";

const options = {
  webHook: {
    port: port,
  },
};

const bot = new TelegramBot(token, options);

const suscriptores = require("./suscriptores.json");

bot.setWebHook(`${url}/bot${token}`);
bot.onText(/\/ping/, function (msg, match) {
  var fromId = msg.chat.id;
  var message = "Estoy viva, bueno, no realmente\n";
  bot.sendMessage(fromId, message);
});

bot.onText(/\/suscribirse/, function (msg, match) {
  var fromId = msg.chat.id;
  console.log("Nuevo suscriptor");
  suscriptores.push(fromId);
  var message =
    "Listo, te suscribiste, te mando un mensaje cuando haya un cambio\n";
  message +=
    "Igual no te garantizo que funcione del todo bien, por las dudas entrá a la web cada tanto\n";
  message += "https://www.ticketek.com.ar/bianca-del-rio/teatro-opera";
  bot.sendMessage(fromId, message);
  fs.writeFile(
    "./suscriptores.json",

    JSON.stringify(suscriptores),

    function (err) {
      if (err) {
        console.error("No pude guardar los suscriptores");
      }
    }
  );
});

let verificador = new VerificadorDeInscripciones((url) => {
  var message = "Hubo un cambio, corré a :\n";
  message += url;
  suscriptores.forEach((suscriptor) => {
    bot.sendMessage(suscriptor, message);
  });
});

verificador.verSiHayNuevasEntradas();
setInterval(function () {
  console.log(new Date());
  verificador.verSiHayNuevasEntradas();
}, 1 * 30 * 1000);

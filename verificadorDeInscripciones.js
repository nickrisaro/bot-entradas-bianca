const https = require("https");

class VerificadorDeInscripciones {
  constructor(notificador) {
    this.hayEntradas = false;
    this.notificador = notificador;
    this.optionsHomeBianca = {
      hostname: "cms-api.ticketek.com.ar",
      path: "/api/1.0/node%3Fpath%3Dbianca-del-rio--teatro-opera",
      metod: "GET",
    };
  }

  verSiHayNuevasEntradas() {
    console.log("Buscando tickets");
    var self = this;

    var request = https.request(self.optionsHomeBianca, function (res) {
      var data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        console.log("Recibi la página, buscando tickets");

        var respuseta = JSON.parse(data);
        var boton = respuseta.widgets.footer[0].state;
        console.log(boton);

        if (!self.hayEntradas) {
          self.hayEntradas = boton === "buy";

          console.log("Hay entradas", self.hayEntradas);

          if (self.hayEntradas) {
            self.notificador(
              "https://www.ticketek.com.ar/bianca-del-rio/teatro-opera"
            );
          }
        }
      });
    });
    request.on("error", (e) => {
      console.error("Error accediendo a los datos: " + e.message);
    });
    request.end();
  }
}

module.exports = VerificadorDeInscripciones;

const express = require("express");
const path = require("path");
const port = 5000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const fs = require("fs");
const JSONdb = require("simple-json-db");
const dbPuntajes = new JSONdb("./src/json/lista.json");
const dbPreguntas = new JSONdb("./src/json/preguntas.json");

const iniciarServer = () => {
  server.listen(port, () => {
    console.log(`El server esta corriendo el puerto:${port}`);
  });
  var publicPath = path.resolve(__dirname, "../public");
  app.use(express.static(publicPath));
  app.get("/", function (req, res) {
    res.sendFile(__dirname + "../public/index.html");
  });
};

const genRandomNumer = () => {
  return Math.floor(Math.random() * (8 - 0));
};
io.on("connection", (socket) => {
  socket.on("pregunta", (data) => {
    if (data == "consulta") {
      let numA = genRandomNumer();
      let numB = genRandomNumer();
      let numC = genRandomNumer();
      let numD = genRandomNumer();
      //console.log("Se hizo la pregunta");
      let jsonDemo = {
        respuestaFalsas: [
          `${dbPreguntas.get(numB).respuesta}`,
          `${dbPreguntas.get(numC).respuesta}`,
          `${dbPreguntas.get(numD).respuesta}`,
        ],
      };
      let jsonToSend = Object.assign(dbPreguntas.get(numA), jsonDemo);
      io.emit("respuesta", jsonToSend);
    }
  });
  socket.on("user", (data) => {
    if (dbPuntajes.has(data)) {
      socket.emit("puntaje", dbPuntajes.get(data));
    }
  });
  socket.on("refreshPoints", (data) => {
    console.log(data);
    dbPuntajes.set(data[0], data[1]);
  });
});
iniciarServer();

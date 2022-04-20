const express = require("express");
const path = require("path");
const port = 5000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const fs = require("fs");

const preguntas = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "src", "json", "preguntas.json")
  )
);

const iniciarServer = () => {
    server.listen(port, () => {
      console.log(
        "\u001b[" +
          33 +
          "m" +
          `El server esta corriendo el puerto:${port}` +
          "\u001b[0m"
      );
    });
    var publicPath = path.resolve(__dirname, "../public");
    app.use(express.static(publicPath));
    app.get("/", function (req, res) {
      res.sendFile(__dirname + "../public/index.html");
    });
}
io.on("connection", (socket) => {
    socket.on("pregunta", (data) => {
        if(data=="consulta"){
            console.log("Se hizo la pregunta")
            io.emit("respuesta",preguntas)
        }
    })
})

iniciarServer()

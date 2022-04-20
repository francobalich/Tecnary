const express = require("express");
const path = require("path");
const port = 5000;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

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
    socket.on("speak", (data) => {

    })
})
iniciarServer()
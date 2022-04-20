const socket = io("http://localhost:5000/");
const btnGenPreg = document.getElementById("btnGenPreg")

socket.on("connect", function (socket) {
  console.log("\u001b[" + 32 + "m" + `Server: CONECTADO` + "\u001b[0m");
});

socket.on("respuesta", (data) => {
  console.log(data);
});

btnGenPreg.addEventListener("click", (event) => {
    socket.emit("pregunta", "consulta");
  });
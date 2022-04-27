const socket = io("http://localhost:5000/");
const txtSaveUser = document.getElementById("user");
const btnSaveUser = document.getElementById("saveUser");
let user="Anonimo"

socket.on("connect", function (socket) {
    console.log("\u001b[" + 32 + "m" + `Inicio: CONECTADO` + "\u001b[0m");
  });

  btnSaveUser.addEventListener("click", (event) => {
    user = txtSaveUser.value;
    socket.emit("saveUser", user);
    console.log(user);
    window.location.href ="./game"
  });
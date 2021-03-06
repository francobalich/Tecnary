const socket = io("http://localhost:5000/");
const respA = document.getElementById("resp1");
const respB = document.getElementById("resp2");
const respC = document.getElementById("resp3");
const respD = document.getElementById("resp4");
const pregunta = document.getElementById("pregunta");

const msgBox = document.getElementById("msgBox");
const points = document.getElementById("points");

let puntos = 0;
let audios;

let jsonData;
const genRandomNumer = (max) => {
  return Math.floor(Math.random() * (max - 0));
};
window.onload = function () {
  socket.emit("usuario", "consulta");
  socket.emit("pregunta", "consulta");
};
socket.on("usuarioRespuesta", (data) => {
  user = data;
  socket.emit("userPoints", user);
});
socket.on("connect", function (socket) {
  console.log("\u001b[" + 32 + "m" + `Game: CONECTADO` + "\u001b[0m");
});

socket.on("puntaje", (data) => {
  puntos = parseInt(data);
  points.innerText = `Puntos de ${user}: ${puntos}`;
});

socket.on("respuesta", (data) => {
  jsonData = data;

  let respuestasList = [data.respuesta];
  respuestasList = respuestasList.concat(data.respuestaFalsas);
  pregunta.innerText = data.pregunta;
  let repeticiones = respuestasList.length;
  let respuestasDesorganizadas = [];
  for (let i = 0; i < repeticiones; i++) {
    let numRandom = genRandomNumer(respuestasList.length);
    respuestasDesorganizadas.push(respuestasList[numRandom]);
    respuestasList.splice(numRandom, 1);
  }
  respA.innerText = respuestasDesorganizadas[0];
  respB.innerText = respuestasDesorganizadas[1];
  respC.innerText = respuestasDesorganizadas[2];
  respD.innerText = respuestasDesorganizadas[3];
});

const genPreg = () => {
  socket.emit("pregunta", "consulta");
};
const validacion = (btn) => {
  if (jsonData.respuesta == btn.textContent) {
    console.log("Correcto");
    puntos += 10;
    audios = new Audio("../sounds/correcto.mp3");
    btn.className += " correcto";
    msgBox.innerHTML = ` <p class="msg correcto">¡Correcto!</p>`;
  } else {
    console.log("Incorrecto");
    puntos -= 10;
    audios = new Audio("../sounds/error.mp3");
    btn.className += " incorrecto";
    msgBox.innerHTML = ` <p class="msg incorrecto">¡Incorrecto!</p>`;
  }
  audios.play();
  let puntosObj = [user, puntos];

  socket.emit("refreshPoints", puntosObj);
  points.innerText = `Puntos de ${user}: ${puntos}`;
  setTimeout(() => {
    genPreg();
    btn.className="btn textSimple"
    audios.pause();
  }, 1000);
};

respA.addEventListener("click", (event) => {
  validacion(respA);
});
respB.addEventListener("click", (event) => {
  validacion(respB);
});
respC.addEventListener("click", (event) => {
  validacion(respC);
});
respD.addEventListener("click", (event) => {
  validacion(respD);
});

const socket = io("http://localhost:5000/");
const btnGenPreg = document.getElementById("btnGenPreg")
const respA = document.getElementById("resp1")
const respB = document.getElementById("resp2")
const respC = document.getElementById("resp3")
const respD = document.getElementById("resp4")
const pregunta = document.getElementById("pregunta")
const msgBox = document.getElementById("msgBox")

let jsonData
const genRandomNumer= (max)=>{
    return Math.floor(Math.random() * (max - 0));
}
window.onload = function() {
    socket.emit("pregunta", "consulta");
  };

socket.on("connect", function (socket) {
  console.log("\u001b[" + 32 + "m" + `Server: CONECTADO` + "\u001b[0m");
});

socket.on("respuesta", (data) => {
    jsonData=data
  
  let respuestasList=[data.respuesta]
  respuestasList=respuestasList.concat(data.respuestaFalsas)
  pregunta.innerText=data.pregunta
  //console.log(respuestasList);
  let repeticiones=respuestasList.length;
  let respuestasDesorganizadas=[]
  for (let i = 0; i < repeticiones; i++) {
      let numRandom=genRandomNumer(respuestasList.length)
      respuestasDesorganizadas.push(respuestasList[numRandom])
      respuestasList.splice(numRandom, 1);
  }
 //console.log(respuestasDesorganizadas)
  respA.innerText=respuestasDesorganizadas[0]
  respB.innerText=respuestasDesorganizadas[1]
  respC.innerText=respuestasDesorganizadas[2]
  respD.innerText=respuestasDesorganizadas[3]
});

btnGenPreg.addEventListener("click", (event) => {
    socket.emit("pregunta", "consulta");
});

const validacion=(btn)=>{
    if(jsonData.respuesta==btn.textContent){
        console.log("Correcto")
        msgBox.innerHTML=` <p class="msg correcto">¡Correcto!</p>`
    }
    else{
        console.log("Incorrecto")
        msgBox.innerHTML=` <p class="msg incorrecto">¡Incorrecto!</p>`
    }
}

respA.addEventListener("click", (event) => {
    validacion(respA)
})
respB.addEventListener("click", (event) => {
    validacion(respB)
})
respC.addEventListener("click", (event) => {
    validacion(respC)
})
respD.addEventListener("click", (event) => {
    validacion(respD)
})
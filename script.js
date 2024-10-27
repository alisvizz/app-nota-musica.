// Definición de respuestas para las primeras preguntas
const respuestas = {
    "acorde": "Un acorde es un grupo de notas que se tocan al mismo tiempo.",
    "mozart": "Mozart fue un compositor austriaco del siglo XVIII, famoso por sus sinfonías y óperas.",
    "escala": "Una escala es una serie de notas ordenadas en una secuencia de tonos específicos.",
    "tempo": "El tempo es la velocidad o ritmo con que se toca una pieza musical.",
    "beethoven": "Beethoven fue un compositor alemán del periodo clásico y romántico, conocido por su obra 'Para Elisa' y la Novena Sinfonía."
  };
  
  // Definición de preguntas adicionales
  const nuevasPreguntas = {
    "armonía": "La armonía es el uso de acordes simultáneos para crear un acompañamiento en la música.",
    "clave": "La clave indica la tonalidad de la pieza musical y el conjunto de notas que se usarán.",
    "sinfonía": "Una sinfonía es una composición musical compleja para orquesta.",
    "ópera": "La ópera es una forma teatral en la que la música acompaña a la actuación y el canto.",
    "barroco": "El barroco fue un periodo musical con gran ornamentación, como en las obras de Bach."
  };
  
  const terceraTandaPreguntas = {
    "sonata": "Una sonata es una composición instrumental de varias partes.",
    "concierto": "Un concierto es una obra musical compuesta para uno o varios instrumentos solistas y orquesta.",
    "tónica": "La tónica es la primera nota de una escala y el centro tonal de la música.",
    "modulación": "La modulación es el cambio de una tonalidad a otra dentro de una pieza musical.",
    "contrapunto": "El contrapunto es la combinación de dos o más líneas melódicas en una composición."
  };
  
  // Preguntas de verdadero o falso
  const preguntasVerdaderoFalso = [
    { pregunta: "Mozart nació en Austria.", respuesta: true, explicacion: "Mozart efectivamente nació en Salzburgo, Austria." },
    { pregunta: "Una sinfonía es una composición para solista.", respuesta: false, explicacion: "Una sinfonía generalmente es una obra para orquesta completa, no para un solista." },
    { pregunta: "La tónica es la tercera nota de la escala.", respuesta: false, explicacion: "La tónica es la primera nota de la escala." },
    { pregunta: "Beethoven fue sordo durante gran parte de su vida.", respuesta: true, explicacion: "Beethoven perdió gran parte de su audición en su adultez." },
    { pregunta: "El barroco es un estilo musical del siglo XIX.", respuesta: false, explicacion: "El barroco fue un estilo musical del siglo XVII y principios del XVIII." }
  ];
  
  let preguntasRespondidas = 0;
  let tandaActual = 1;
  
  // Función para mostrar las tres primeras tandas de preguntas
  function responder(pregunta) {
    const respuesta = respuestas[pregunta] || nuevasPreguntas[pregunta] || terceraTandaPreguntas[pregunta];
    document.getElementById('respuesta').innerText = respuesta;
    preguntasRespondidas++;
  
    if (preguntasRespondidas === 5) {
      preguntasRespondidas = 0;
      tandaActual++;
      if (tandaActual === 2) {
        mostrarNuevasPreguntas(nuevasPreguntas);
      } else if (tandaActual === 3) {
        mostrarNuevasPreguntas(terceraTandaPreguntas);
      } else {
        ofrecerContinuacion();
      }
    }
  }
  
  // Muestra nuevas tandas de preguntas en formato de nube
  function mostrarNuevasPreguntas(preguntas) {
    const contenedorNubes = document.getElementById('contenedorNubes');
    contenedorNubes.innerHTML = '';
  
    Object.keys(preguntas).forEach(pregunta => {
      const nubePregunta = document.createElement('div');
      nubePregunta.classList.add('nubePregunta');
      nubePregunta.innerText = pregunta.charAt(0).toUpperCase() + pregunta.slice(1);
      nubePregunta.onclick = () => responder(pregunta);
      contenedorNubes.appendChild(nubePregunta);
    });
  }
  
  // Ofrece la opción de continuar o terminar tras las tres tandas iniciales
  function ofrecerContinuacion() {
    document.getElementById('respuesta').innerText = '';
    document.querySelector('#profeNota p').innerText = ''; 
    const contenedorNubes = document.getElementById('contenedorNubes');
    contenedorNubes.innerHTML = ''; 
  
    const mensajeFinal = document.createElement('p');
    mensajeFinal.innerText = "¡Buen trabajo!";
    mensajeFinal.classList.add('respuesta');
    
    const preguntaContinuar = document.createElement('p');
    preguntaContinuar.innerText = "¿Quieres seguir jugando?";
    preguntaContinuar.classList.add('respuesta');
    
    const botonSi = document.createElement('div');
    botonSi.classList.add('nubePregunta');
    botonSi.innerText = "Sí, continuemos";
    botonSi.onclick = iniciarVerdaderoFalso;
  
    const botonNo = document.createElement('div');
    botonNo.classList.add('nubePregunta');
    botonNo.innerText = "No, ya he terminado por hoy";
    botonNo.onclick = despedirProfe;
  
    document.getElementById('profeNota').appendChild(mensajeFinal);
    document.getElementById('profeNota').appendChild(preguntaContinuar);
    contenedorNubes.appendChild(botonSi);
    contenedorNubes.appendChild(botonNo);
  }
  
  // Inicia las preguntas de verdadero o falso
  function iniciarVerdaderoFalso() {
    document.getElementById('profeNota').innerHTML = `
      <p class="respuesta" id="respuesta"></p>
      <div id="contenedorNubes"></div>
    `;
    preguntasRespondidas = 0;
    mostrarPreguntaVF();
  }
  
  // Muestra cada pregunta de verdadero o falso con los botones correspondientes
  function mostrarPreguntaVF() {
    if (preguntasRespondidas < preguntasVerdaderoFalso.length) {
      const preguntaActual = preguntasVerdaderoFalso[preguntasRespondidas];
      document.getElementById('respuesta').innerText = preguntaActual.pregunta;
      document.getElementById('respuesta').style.color = '#204080';
  
      const contenedorNubes = document.getElementById('contenedorNubes');
      contenedorNubes.innerHTML = ''; 
  
      const botonVerdadero = document.createElement('div');
      botonVerdadero.classList.add('nubePregunta');
      botonVerdadero.innerText = "Verdadero";
      botonVerdadero.style.backgroundColor = 'green';
      botonVerdadero.onclick = () => verificarRespuestaVF(true);
  
      const botonFalso = document.createElement('div');
      botonFalso.classList.add('nubePregunta');
      botonFalso.innerText = "Falso";
      botonFalso.style.backgroundColor = 'red';
      botonFalso.onclick = () => verificarRespuestaVF(false);
  
      contenedorNubes.appendChild(botonVerdadero);
      contenedorNubes.appendChild(botonFalso);
    } else {
      mostrarMensajeFinalJuego();
    }
  }
  
  // Verifica la respuesta en las preguntas de verdadero o falso
  function verificarRespuestaVF(respuesta) {
    const preguntaActual = preguntasVerdaderoFalso[preguntasRespondidas];
    const correcta = preguntaActual.respuesta;
  
    if (respuesta === correcta) {
      document.getElementById('respuesta').innerText = "¡Correcto!";
      preguntasRespondidas++;
      setTimeout(mostrarPreguntaVF, 750); // Tiempo reducido a la mitad para avanzar a la siguiente pregunta
    } else {
      document.getElementById('respuesta').innerText = `Incorrecto. ${preguntaActual.explicacion}`;
      document.getElementById('respuesta').style.color = '#204080';
  
      // Elimina los botones de verdadero y falso y muestra el botón "Entendido"
      const contenedorNubes = document.getElementById('contenedorNubes');
      contenedorNubes.innerHTML = ''; 
  
      const botonEntendido = document.createElement('div');
      botonEntendido.classList.add('nubePregunta');
      botonEntendido.innerText = "Entendido";
      botonEntendido.onclick = mostrarPreguntaVF;
  
      contenedorNubes.appendChild(botonEntendido);
    }
  }
  
  // Mensaje de despedida cuando se elige terminar tras las tres primeras tandas
  function despedirProfe() {
    document.getElementById('profeNota').innerHTML = '<p class="respuesta" id="respuesta">¡Hasta la próxima!</p>';
  }
  
  // Mensaje final al completar el juego de verdadero o falso
  function mostrarMensajeFinalJuego() {
    document.getElementById('respuesta').innerText = "¡Buen trabajo! Pasaste el juego";
    document.getElementById('contenedorNubes').innerHTML = '';
  }


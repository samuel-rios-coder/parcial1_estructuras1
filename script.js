// recupera los votos del navegador o arranca en cero
let votos = JSON.parse(localStorage.getItem("votos")) || {
  "JavaScript": 0,
  "Python": 0,
  "C++": 0,
  "Otro" : 0
};

let form = document.getElementById("formEncuesta");
let tabla = document.getElementById("tablaResultados");
let resetBtn = document.getElementById("resetBtn");

// Mostrar los resultados
function mostrarResultados() {
  let total = votos.JavaScript + votos.Python + votos["C++"] + votos.Otro;
  tabla.innerHTML = "";
  for (let opcion in votos) {
    let cantidad = votos[opcion];
    let porcentaje = total > 0 ? ((cantidad / total) * 100).toFixed(1) : 0;
    tabla.innerHTML += `<tr><td>${opcion}</td><td>${cantidad}</td><td>${porcentaje}%</td></tr>`;
  }
}

// Cuando alguien vota
form.onsubmit = (e) => {
  e.preventDefault();
  let eleccion = document.querySelector("input[name='lenguaje']:checked").value;
  votos[eleccion]++;
  localStorage.setItem("votos", JSON.stringify(votos));
  mostrarResultados();

  // Bloquear el formulario hasta que se recargue la pagina
  Array.from(form.elements).forEach(el => el.disabled = true);
};

//  Reiniciar resultados
resetBtn.onclick = () => {
  votos = { "JavaScript": 0, "Python": 0, "C++": 0, "Otro": 0 };
  localStorage.removeItem("votos");  //borra la memoria del google
  mostrarResultados();
  form.reset();
  Array.from(form.elements).forEach(el => el.disabled = false); // vuelve a habilitar
};

// Mostrar resultados al entrar
mostrarResultados();

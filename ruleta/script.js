let currentRotation = 0;

// Configuración de premios
const premios = [
  { label: "Vale S/.30", index: 0 },
  { label: "Perdido", index: 1 },
  { label: "Vale S/.30", index: 2 },
  { label: "Perdido", index: 3 },
  { label: "Vale S/.30", index: 4 },
  { label: "Perdido", index: 5 },
  { label: "Vale S/.30", index: 6 },
  { label: "Vale S/.100", index: 7 } // premio máximo
];

document.getElementById("girar").addEventListener("click", spinWheel);
document.getElementById("nuevo").addEventListener("click", nuevoGiro);

// Validación formulario
function formFilled() {
  return (
    document.getElementById("nombre").value &&
    document.getElementById("telefono").value &&
    document.getElementById("cumple").value
  );
}

// Elegir premio (ejemplo con probabilidad)
function getPrize() {
  // premio cada 5 giros aprox, premio máximo cada 300
  const random = Math.random() * 1000;

  if (random < 3) return premios[7]; // premio máximo
  else if (random < 200) return premios[Math.floor(Math.random() * 4) * 2]; // premios normales
  else return premios[[1, 3, 5][Math.floor(Math.random() * 3)]]; // perdidos
}

function spinWheel() {
  if (!formFilled()) {
    alert("Por favor completa el formulario antes de girar.");
    return;
  }

  const ruleta = document.getElementById("ruleta");
  const outcome = getPrize();
  const segmentAngle = 360 / premios.length;
  const prizeIndex = outcome.index;
  const randomExtra = Math.floor(Math.random() * segmentAngle);
  const targetRotation = 360 * 5 + (prizeIndex * segmentAngle) + randomExtra;

  currentRotation += targetRotation;
  ruleta.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    saveResult(outcome);
    alert(`Resultado: ${outcome.label}`);
    document.getElementById("nuevo").disabled = false;
    document.getElementById("girar").disabled = true;
  }, 4000);
}

function saveResult(outcome) {
  const data = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    cumple: document.getElementById("cumple").value,
    resultado: outcome.label,
    timestamp: new Date().toISOString()
  };

  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(res => console.log("Guardado en Google Sheets", res));
}

function nuevoGiro() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("cumple").value = "";
  document.getElementById("girar").disabled = false;
  document.getElementById("nuevo").disabled = true;
}

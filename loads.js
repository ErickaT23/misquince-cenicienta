// loads.js

const guests = [
  { id: "1", name: "Anabella & Leandro", passes: 2 },
  { id: "2", name: "Macarena & Rogelio",   passes: 2 },
  // … agrega todos los invitados
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Leer el parámetro ?id=XXX
  const params  = new URLSearchParams(window.location.search);
  const guestId = params.get("id");

  // 2. Buscar ese invitado
  const guest = guests.find(g => g.id === guestId);

  if (guest) {
    // 3. Mostrar nombre y pases
    const invitText = guest.passes > 1
      ? `¡${guest.name}, están invitados!`
      : `¡${guest.name}, estás invitado!`;

    document.getElementById("nombreInvitado").textContent   = invitText;
    document.getElementById("cantidadPases").textContent   = 
      `${guest.passes} ${guest.passes === 1 ? "pase" : "pases"}`;

    // 4. Llamar a abrirInvitacion si ya la tienes en script.js
    if (typeof abrirInvitacion === "function") {
      abrirInvitacion();
    }
  } else {
    // 5. Si no existe, ocultar todo el bloque de invitación
    const invitacion = document.getElementById("invitacion");
    if (invitacion) invitacion.style.display = "none";
  }
});

  
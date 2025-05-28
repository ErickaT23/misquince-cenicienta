// script.js

let invitados = [];

// 1. Carga dinámica del listado de invitados desde JSON
async function cargarInvitados() {
  try {
    const res = await fetch('/data/invitados.json');
    invitados = await res.json();
  } catch (err) {
    console.error('Error cargando invitados:', err);
  }
}

// 2. Renderiza los enlaces personalizados para cada invitado
function renderizarEnlaces() {
  const ul = document.getElementById('lista-invitados');
  if (!ul) return;
  ul.innerHTML = ''; // Limpia contenido previo

  invitados.forEach(inv => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = `${window.location.pathname}?id=${encodeURIComponent(inv.id)}`;
    a.textContent = `${inv.nombre} ${inv.frase}`;
    a.style.textDecoration = 'none';
    li.appendChild(a);
    ul.appendChild(li);
  });
}

// 3. Mostrar datos del invitado actual (según ?id=)
function cargarDatosInvitado() {
  const params     = new URLSearchParams(window.location.search);
  const invitadoId = params.get('id');

  if (!invitadoId) {
    return; // No mostrar alerta para administradores
  }

  const invitado = invitados.find(i => i.id === invitadoId);
  if (invitado) {
    document.getElementById('nombreInvitado').innerText = invitado.nombre;
    document.getElementById('cantidadPases').innerText = `Pases: ${invitado.pases}`;
  } else {
    alert('Invitado no encontrado.');
  }
}

// 4. Lógica de apertura de invitación y reproducción de música
function abrirInvitacion() {
  const envelope  = document.getElementById('envelope');
  const invitacion = document.getElementById('invitacion');

  envelope.classList.add('open');
  setTimeout(() => {
    envelope.style.display     = 'none';
    invitacion.style.display   = 'block';
    document.getElementById('musica')?.play();
  }, 1000);
}

// 5. Contador regresivo al evento
function iniciarContador() {
  const eventoFecha = new Date('August 02, 2025 00:00:00').getTime();

  setInterval(() => {
    const ahora     = Date.now();
    const diff      = eventoFecha - ahora;
    const dias      = Math.floor(diff / (1000*60*60*24));
    const horas     = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutos   = Math.floor((diff % (1000*60*60)) / (1000*60));
    const segundos  = Math.floor((diff % (1000*60)) / 1000);

    document.getElementById('dias').innerText     = dias;
    document.getElementById('horas').innerText    = horas;
    document.getElementById('minutos').innerText  = minutos;
    document.getElementById('segundos').innerText = segundos;
  }, 1000);
}

// 6. Lightbox para galería
function changePhoto(element) {
  document.getElementById('main-photo-modal').src = element.src;
  document.getElementById('photo-modal').style.display = 'flex';
}
function closeModal(event) {
  if (!event || event.target.id === 'photo-modal' || event.target.classList.contains('close')) {
    document.getElementById('photo-modal').style.display = 'none';
  }
}

// 7. Confirmar asistencia vía WhatsApp
function confirmarAsistencia() {
  const nombre = document.getElementById('nombreInvitado').innerText || 'invitado';
  const pases  = document.getElementById('cantidadPases').innerText.replace('Pases: ', '');
  const mensaje = `Hola, soy ${nombre} y confirmo mi asistencia con ${pases} pases para la fiesta de quince años.`;
  const telefono = '50247696714';
  window.open(`https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`, '_blank');
}

// 8. Enlaces de dirección para ceremonia y recepción
function elegirAplicacion() {
  window.open('https://maps.app.goo.gl/dfD9cMEbSAdn56qV8', '_blank');
  setTimeout(() => window.open('https://waze.com/ul?ll=14.558065,-90.729567&navigate=yes','_blank'), 1000);
}
function elegirAplicacionOtraDireccion() {
  window.open('https://maps.app.goo.gl/x1VEyzHxdwP7FMkX6', '_blank');
  setTimeout(() => window.open('https://ul.waze.com/ul?venue_id=176619666.1766065588.2060019&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location','_blank'), 1000);
}

// 9. Observer para fade-in on scroll
function initFadeInObserver() {
  const elems = document.querySelectorAll('.fade-in-element');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  elems.forEach(el => observer.observe(el));
}

// Inicialización al cargar DOM
document.addEventListener('DOMContentLoaded', async () => {
  await cargarInvitados();
  iniciarContador();
  cargarDatosInvitado();
  renderizarEnlaces();
  initFadeInObserver();

  // Evento click para abrir invitación
  document.getElementById('seal')?.addEventListener('click', abrirInvitacion);
});


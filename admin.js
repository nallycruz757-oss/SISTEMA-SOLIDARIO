// ========================================================
// PANEL DE ADMINISTRACIÓN - PSICOPEDAGOGA
// Control, Supervisión, Aprobación, Fotos y Seguridad
// ========================================================

// Verificar si la psicopedagoga ingresó su contraseña
(function verificarSesionPsico() {
  const autenticada = sessionStorage.getItem('psico_autenticada');
  if (autenticada !== 'true') {
    alert('Acceso protegido. Por favor ingresa con la contraseña de Psicopedagogía desde el portal principal.');
    window.location.href = 'index.html';
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  actualizarMetricas();
  cargarTablaPendientes();
  cargarTablaInventario();
  cargarTablaSolicitudes();
});

// Cerrar sesión
function cerrarSesionAdmin() {
  if (confirm('¿Deseas cerrar la sesión del gabinete de psicopedagogía?')) {
    sessionStorage.removeItem('psico_autenticada');
    window.location.href = 'index.html';
  }
}

// Pestañas
function cambiarTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('activo'));
  document.querySelectorAll('.seccion-tab').forEach(sec => sec.classList.remove('activa'));

  if (tab === 'pendientes') {
    document.querySelectorAll('.tab-btn')[0].classList.add('activo');
    document.getElementById('tabPendientes').classList.add('activa');
  } else if (tab === 'inventario') {
    document.querySelectorAll('.tab-btn')[1].classList.add('activo');
    document.getElementById('tabInventario').classList.add('activa');
  } else if (tab === 'solicitudes') {
    document.querySelectorAll('.tab-btn')[2].classList.add('activo');
    document.getElementById('tabSolicitudes').classList.add('activa');
  }
}

// Estadísticas para mostrar en la pantalla
function actualizarMetricas() {
  const donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];
  const solicitudes = JSON.parse(localStorage.getItem('esl_solicitudes')) || [];

  const aprobados = donaciones.filter(d => d.estadoRevision === 'Aprobado').length;
  const pendientes = donaciones.filter(d => d.estadoRevision === 'Pendiente').length;
  const prendas = donaciones.filter(d => d.categoria === 'Prendas y Uniformes').length;

  document.getElementById('statAprobados').innerText = aprobados;
  document.getElementById('statPendientes').innerText = pendientes;
  document.getElementById('statSolicitudes').innerText = solicitudes.length;
  document.getElementById('statPrendas').innerText = prendas;
}

// Cargar Donaciones Pendientes de Aprobación (con miniatura de foto)
function cargarTablaPendientes() {
  const tbody = document.getElementById('tablaPendientesCuerpo');
  const donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];
  const pendientes = donaciones.filter(d => d.estadoRevision === 'Pendiente');

  if (pendientes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:1.8rem; color:#718096;"><i class="fas fa-check-circle text-exito"></i> No hay donaciones pendientes por revisar en este momento.</td></tr>`;
    return;
  }

  tbody.innerHTML = pendientes.map(item => {
    const fotoSrc = item.foto && item.foto.trim() !== "" ? item.foto : 
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='10' fill='%23fce4ec'/><text x='50' y='55' font-size='10' text-anchor='middle' fill='%23d81b60'>Sin foto</text></svg>";

    return `
      <tr>
        <td style="text-align:center;">
          <img src="${fotoSrc}" alt="Prenda" class="mini-foto-tabla" onclick="verFotoGrande('${encodeURIComponent(fotoSrc)}', '${item.nombre.replace(/'/g, "\'")}')" title="Clic para ampliar foto">
        </td>
        <td>${item.fecha}</td>
        <td><strong>${item.nombre}</strong><br><small style="color:#718096;">${item.descripcion}</small></td>
        <td><span class="badge-tipo badge-donacion">${item.categoria}</span></td>
        <td><span style="color:#2e7d32; font-weight:600;"><i class="fas fa-check-circle"></i> ${item.estadoFisico}</span></td>
        <td>${item.donante} ${item.anonimo ? '<br><small style="color:#e53e3e; font-weight:bold;">(Anónimo para alumnos)</small>' : ''}</td>
        <td>${item.curso}</td>
        <td>${item.modalidad}</td>
        <td>
          <div class="acciones-flex">
            <button onclick="aprobarDonacion(${item.id})" class="btn btn-sm btn-exito" title="Aprobar para publicar en el sistema">
              <i class="fas fa-check"></i> Aprobar
            </button>
            <button onclick="rechazarDonacion(${item.id})" class="btn btn-sm" style="background:#e53e3e; color:white;" title="Rechazar publicación">
              <i class="fas fa-times"></i> Descartar
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Cargar Inventario Solidario
function cargarTablaInventario() {
  const tbody = document.getElementById('tablaInventarioCuerpo');
  const donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];

  if (donaciones.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:1.8rem;">No hay artículos registrados en el inventario.</td></tr>`;
    return;
  }

  tbody.innerHTML = donaciones.map(item => {
    const fotoSrc = item.foto && item.foto.trim() !== "" ? item.foto : 
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='10' fill='%23fce4ec'/><text x='50' y='55' font-size='10' text-anchor='middle' fill='%23d81b60'>Sin foto</text></svg>";

    return `
      <tr>
        <td style="text-align:center;">
          <img src="${fotoSrc}" alt="Prenda" class="mini-foto-tabla" onclick="verFotoGrande('${encodeURIComponent(fotoSrc)}', '${item.nombre.replace(/'/g, "\'")}')" title="Clic para ampliar foto">
        </td>
        <td><strong>#ESL-${item.id.toString().slice(-4)}</strong></td>
        <td><strong>${item.nombre}</strong></td>
        <td>${item.categoria}</td>
        <td>${item.modalidad}</td>
        <td>${item.donante} (${item.curso})</td>
        <td>
          <span class="badge-tipo ${item.estadoRevision === 'Aprobado' ? 'badge-donacion' : item.estadoRevision === 'Entregado' ? 'badge-intercambio' : 'badge-prestamo'}">
            ${item.estadoRevision}
          </span>
        </td>
        <td>
          <div class="acciones-flex">
            ${item.estadoRevision === 'Aprobado' ? `
              <button onclick="marcarEntregado(${item.id})" class="btn btn-sm btn-secundario">
                <i class="fas fa-hands"></i> Marcar Entregado
              </button>
            ` : ''}
            <button onclick="eliminarArticulo(${item.id})" class="btn btn-sm" style="background:#ef4444; color:white;">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Cargar Solicitudes de Alumnos
function cargarTablaSolicitudes() {
  const tbody = document.getElementById('tablaSolicitudesCuerpo');
  const solicitudes = JSON.parse(localStorage.getItem('esl_solicitudes')) || [];

  if (solicitudes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:1.8rem; color:#718096;">No hay solicitudes registradas de estudiantes.</td></tr>`;
    return;
  }

  tbody.innerHTML = solicitudes.map(sol => `
    <tr>
      <td>${sol.fecha}</td>
      <td><strong>${sol.estudiante}</strong></td>
      <td>${sol.curso}</td>
      <td style="color:#880e4f; font-weight:600;">${sol.articulo}</td>
      <td>${sol.mensaje}</td>
      <td><i class="fab fa-whatsapp text-exito"></i> ${sol.telefono}</td>
      <td><span class="badge-tipo badge-prestamo">${sol.estado}</span></td>
      <td>
        <div class="acciones-flex">
          <button onclick="atenderSolicitud(${sol.id})" class="btn btn-sm btn-exito">
            <i class="fas fa-check-circle"></i> Atendido
          </button>
          <button onclick="eliminarSolicitud(${sol.id})" class="btn btn-sm" style="background:#ef4444; color:white;">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Acciones de psicopedagoga
function aprobarDonacion(id) {
  let donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];
  donaciones = donaciones.map(item => {
    if (item.id === id) item.estadoRevision = 'Aprobado';
    return item;
  });
  localStorage.setItem('esl_donaciones', JSON.stringify(donaciones));
  alert('La donación ha sido aprobada con éxito. Ya es visible en el catálogo de los alumnos.');
  actualizarTodo();
}

function rechazarDonacion(id) {
  if (confirm('¿Está segura de descartar esta publicación?')) {
    let donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];
    donaciones = donaciones.filter(item => item.id !== id);
    localStorage.setItem('esl_donaciones', JSON.stringify(donaciones));
    actualizarTodo();
  }
}

function marcarEntregado(id) {
  let donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];
  donaciones = donaciones.map(item => {
    if (item.id === id) item.estadoRevision = 'Entregado';
    return item;
  });
  localStorage.setItem('esl_donaciones', JSON.stringify(donaciones));
  alert('Se ha registrado la entrega del artículo al estudiante beneficiario.');
  actualizarTodo();
}

function eliminarArticulo(id) {
  if (confirm('¿Desea eliminar definitivamente este registro?')) {
    let donaciones = JSON.parse(localStorage.getItem('esl_donaciones')) || [];
    donaciones = donaciones.filter(item => item.id !== id);
    localStorage.setItem('esl_donaciones', JSON.stringify(donaciones));
    actualizarTodo();
  }
}

function atenderSolicitud(id) {
  let solicitudes = JSON.parse(localStorage.getItem('esl_solicitudes')) || [];
  solicitudes = solicitudes.map(s => {
    if (s.id === id) s.estado = 'Entregado / Atendido';
    return s;
  });
  localStorage.setItem('esl_solicitudes', JSON.stringify(solicitudes));
  alert('Solicitud marcada como atendida por Psicopedagogía.');
  actualizarTodo();
}

function eliminarSolicitud(id) {
  if (confirm('¿Eliminar esta solicitud?')) {
    let solicitudes = JSON.parse(localStorage.getItem('esl_solicitudes')) || [];
    solicitudes = solicitudes.filter(s => s.id !== id);
    localStorage.setItem('esl_solicitudes', JSON.stringify(solicitudes));
    actualizarTodo();
  }
}

// Modal para ver foto en tamaño grande
function verFotoGrande(fotoEncoded, titulo) {
  const fotoSrc = decodeURIComponent(fotoEncoded);
  document.getElementById('modalFotoTitulo').innerText = `Fotografía de: ${titulo}`;
  document.getElementById('modalFotoSrc').src = fotoSrc;
  document.getElementById('modalVerFotoGrande').style.display = 'flex';
}

function cerrarModalFoto() {
  document.getElementById('modalVerFotoGrande').style.display = 'none';
}

function actualizarTodo() {
  actualizarMetricas();
  cargarTablaPendientes();
  cargarTablaInventario();
  cargarTablaSolicitudes();
}

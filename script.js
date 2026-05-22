// ==============================
// SPLASH SCREEN
// ==============================

window.addEventListener("load", () => {

    setTimeout(() => {

        document
        .getElementById("splashScreen")
        .classList.add("hidden");

    }, 2000);

});

// ==============================
// VARIABLES
// ==============================

let origenSeleccionado = false;
let destinoSeleccionado = false;

// ==============================
// MAPA
// ==============================

const map = L.map('map', {
    zoomControl: false
}).setView([-16.5205, -68.1025], 14);

// ==============================
// MAPA BASE
// ==============================

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution: ''
}).addTo(map);

// ==============================
// MARCADORES
// ==============================

const inicio = [-16.51714, -68.08990];

const destino = [-16.52269, -68.11199];

// MARCADOR INICIO

const marcadorInicio = L.marker(inicio)
.bindPopup("Punto de inicio");

// MARCADOR DESTINO

const marcadorDestino = L.marker(destino)
.bindPopup("Destino");

// ==============================
// CAPAS
// ==============================

let capasActuales = [];

// ==============================
// FUNCION KML
// ==============================

function cargarKML(
    archivo,
    color,
    peso = 6,
    opacidad = 1
){

    const capa = omnivore.kml(
        `rutas/${archivo}`,
        null,
        L.geoJson(null, {

            pointToLayer: function () {
                return null;
            }

        })
    );

    capa.on('ready', function(){

        capa.setStyle({

            color: color,
            weight: peso,
            opacity: opacidad

        });

    });

    capa.addTo(map);

    capasActuales.push(capa);
}

// ==============================
// LIMPIAR RUTAS
// ==============================

function limpiarRutas(){

    capasActuales.forEach(capa => {

        map.removeLayer(capa);

    });

    capasActuales = [];
}

// ==============================
// ABRIR MODAL ORIGEN
// ==============================

document
.getElementById("openOrigin")
.addEventListener("click", () => {

    document
    .getElementById("originModal")
    .classList.remove("hidden");

});

// ==============================
// ABRIR MODAL DESTINO
// ==============================

document
.getElementById("openDestination")
.addEventListener("click", () => {

    document
    .getElementById("destinationModal")
    .classList.remove("hidden");

});

// ==============================
// SELECCIONAR ORIGEN
// ==============================

function seleccionarOrigen(nombre){

    document
    .getElementById("openOrigin")
    .innerText = nombre;

    document
    .getElementById("originModal")
    .classList.add("hidden");

    origenSeleccionado = true;

    verificarBusqueda();
}

// ==============================
// SELECCIONAR DESTINO
// ==============================

function seleccionarDestino(nombre){

    document
    .getElementById("openDestination")
    .innerText = nombre;

    document
    .getElementById("destinationModal")
    .classList.add("hidden");

    destinoSeleccionado = true;

    verificarBusqueda();
}

// ==============================
// ACTIVAR BOTON
// ==============================

function verificarBusqueda(){

    const boton =
    document.getElementById("buscarRuta");

    if(
        origenSeleccionado &&
        destinoSeleccionado
    ){

        boton.disabled = false;

    }
}

// ==============================
// MOSTRAR RUTAS
// ==============================

function mostrarRuta(opcion, boton){

    // BOTONES

    document
    .querySelectorAll('.tab-btn')
    .forEach(btn => {

        btn.classList.remove('active');

    });

    boton.classList.add('active');

    // LIMPIAR

    limpiarRutas();

    // LIMPIAR MARCADORES

    if(map.hasLayer(marcadorInicio)){
    map.removeLayer(marcadorInicio);
}

if(map.hasLayer(marcadorDestino)){
    map.removeLayer(marcadorDestino);
}

    // AGREGAR MARCADORES

    marcadorInicio.addTo(map);

    marcadorDestino.addTo(map);

    // VISUAL

    const visual =
    document.getElementById("routeVisual");

    // ==========================
    // OPCION 1
    // ==========================

    if(opcion === 1){

        visual.innerHTML = `

        <div class="transport-card blue">

            <div class="transport-type">
                TRUFI
            </div>

            <div class="transport-line">
                TRANS BOLOGNIA
            </div>

        </div>

        <div class="route-arrow">
            →
        </div>

        <div class="transport-card yellow">

            <div class="transport-type">
                MINIBUS
            </div>

            <div class="transport-line">
                AMARILLO
            </div>

        </div>

        <div class="route-arrow">
            →
        </div>

        <div class="transport-card walk">

            <div class="transport-type">
                A PIE
            </div>

            <div class="transport-line">
                CAMINATA
            </div>

        </div>
        `;

        cargarKML(
            "trufi.kml",
            "#2563EB",
            7,
            1
        );

        cargarKML(
            "amarillo.kml",
            "#FBBF24",
            7,
            1
        );

        cargarKML(
            "pie.kml",
            "#4B5563",
            5,
            0.9
        );
    }

    // ==========================
    // OPCION 2
    // ==========================

    if(opcion === 2){

        visual.innerHTML = `

        <div class="transport-card yellow">

            <div class="transport-type">
                MINIBUS
            </div>

            <div class="transport-line">
                344
            </div>

        </div>
        `;

        cargarKML(
            "344.kml",
            "#FBBF24",
            7,
            1
        );
    }

    // ==========================
    // OPCION 3
    // ==========================

    if(opcion === 3){

        visual.innerHTML = `

        <div class="transport-card yellow">

            <div class="transport-type">
                MINIBUS
            </div>

            <div class="transport-line">
                246
            </div>

        </div>

        <div class="route-arrow">
            →
        </div>

        <div class="transport-card walk">

            <div class="transport-type">
                A PIE
            </div>

            <div class="transport-line">
                CAMINATA
            </div>

        </div>
        `;

        cargarKML(
            "246.kml",
            "#FBBF24",
            7,
            1
        );

        cargarKML(
            "pie.kml",
            "#4B5563",
            5,
            0.9
        );
    }
}

// ==============================
// BUSCAR RUTA
// ==============================

document
.getElementById("buscarRuta")
.addEventListener("click", () => {

    // MOSTRAR LOADING

    document
    .getElementById("loadingScreen")
    .classList.remove("hidden");

    // ESPERA

    setTimeout(() => {

        // OCULTAR LOADING

        document
        .getElementById("loadingScreen")
        .classList.add("hidden");

        // MOSTRAR PANEL

        document
        .getElementById("routesPanel")
        .classList.remove("hidden");

        // MOSTRAR RUTA 1

        const primerBoton =
        document.querySelector(".tab-btn");

        mostrarRuta(1, primerBoton);

    }, 2200);

});
// ==============================
// COLAPSAR SEARCH BOX
// ==============================

const toggleSearch =
document.getElementById("toggleSearch");

const searchBox =
document.getElementById("searchBox");

let searchCollapsed = false;

// EVENTO

toggleSearch.addEventListener("click", () => {

    // SI ESTA CERRADO

    if(searchCollapsed){

        // MOSTRAR

        searchBox.classList.remove("collapsed");

        // CAMBIAR ICONO

        toggleSearch.innerHTML = "⌃";

        searchCollapsed = false;

    }

    // SI ESTA ABIERTO

    else{

        // OCULTAR

        searchBox.classList.add("collapsed");

        // CAMBIAR ICONO

        toggleSearch.innerHTML = "⌄";

        searchCollapsed = true;
    }

});
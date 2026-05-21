//////////////////////////////////////////////////////
// MAPA
//////////////////////////////////////////////////////

const map = L.map('map', {
    zoomControl: false
}).setView([-16.5205, -68.1050], 13);

//////////////////////////////////////////////////////
// MAPA BASE
//////////////////////////////////////////////////////

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

//////////////////////////////////////////////////////
// MARCADOR INICIO
//////////////////////////////////////////////////////

const inicio = L.marker(
[-16.51714, -68.08990]
).addTo(map);

inicio.bindPopup(
"Punto de partida"
);

//////////////////////////////////////////////////////
// MARCADOR DESTINO
//////////////////////////////////////////////////////

const destino = L.marker(
[-16.52269, -68.11199]
).addTo(map);

destino.bindPopup(
"Universidad Católica Boliviana"
);

//////////////////////////////////////////////////////
// VARIABLES
//////////////////////////////////////////////////////

let capasActivas = [];

//////////////////////////////////////////////////////
// MOSTRAR PANEL
//////////////////////////////////////////////////////

document
.getElementById("buscarRuta")
.addEventListener("click", () => {

    document
    .getElementById("routesPanel")
    .classList
    .remove("hidden");

});

//////////////////////////////////////////////////////
// LIMPIAR RUTAS
//////////////////////////////////////////////////////

function limpiarRutas(){

    capasActivas.forEach(capa => {
        map.removeLayer(capa);
    });

    capasActivas = [];
}

//////////////////////////////////////////////////////
// CARGAR KML
//////////////////////////////////////////////////////

function cargarKML(
    archivo,
    color,
    grosor = 7,
    opacity = 1,
    dash = null
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

        this.setStyle({

            color: color,

            weight: grosor,

            opacity: opacity,

            dashArray: dash,

            lineCap: "round",

            lineJoin: "round"

        });

    });

    capa.addTo(map);

    capasActivas.push(capa);
}

//////////////////////////////////////////////////////
// ACTUALIZAR VISUAL
//////////////////////////////////////////////////////

function actualizarVisual(opcion){

    const visual =
    document.getElementById("routeVisual");

    //////////////////////////////////////////////////
    // OPCION 1
    //////////////////////////////////////////////////

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
    }

    //////////////////////////////////////////////////
    // OPCION 2
    //////////////////////////////////////////////////

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
    }

    //////////////////////////////////////////////////
    // OPCION 3
    //////////////////////////////////////////////////

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
    }
}

//////////////////////////////////////////////////////
// MOSTRAR RUTAS
//////////////////////////////////////////////////////

function mostrarRuta(opcion, boton){

    //////////////////////////////////////////////////
    // BOTONES ACTIVOS
    //////////////////////////////////////////////////

    document
    .querySelectorAll(".tab-btn")
    .forEach(btn => {
        btn.classList.remove("active");
    });

    if(boton){
        boton.classList.add("active");
    }

    //////////////////////////////////////////////////
    // ACTUALIZAR VISUAL
    //////////////////////////////////////////////////

    actualizarVisual(opcion);

    //////////////////////////////////////////////////
    // LIMPIAR MAPA
    //////////////////////////////////////////////////

    limpiarRutas();

    //////////////////////////////////////////////////
    // OPCION 1
    //////////////////////////////////////////////////

    if(opcion === 1){

        // TRUFI PRINCIPAL

        cargarKML(
            "trufi.kml",
            "#2F80ED",
            8,
            1
        );

        // MINIBUS AMARILLO

        cargarKML(
            "amarillo.kml",
            "#F2C94C",
            8,
            0.8
        );

        // CAMINATA

        cargarKML(
            "apie.kml",
            "#4F4F4F",
            5,
            1,
            "10,10"
        );
    }

    //////////////////////////////////////////////////
    // OPCION 2
    //////////////////////////////////////////////////

    if(opcion === 2){

        cargarKML(
            "344.kml",
            "#F2C94C",
            8,
            1
        );
    }

    //////////////////////////////////////////////////
    // OPCION 3
    //////////////////////////////////////////////////

    if(opcion === 3){

        cargarKML(
            "246.kml",
            "#F2C94C",
            8,
            1
        );

        cargarKML(
            "apie.kml",
            "#4F4F4F",
            5,
            1,
            "10,10"
        );
    }
}

//////////////////////////////////////////////////////
// RUTA DEFAULT
//////////////////////////////////////////////////////

mostrarRuta(1);
var map = L.map('map-template').setView([4.138794, -73.632410], 13, );

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();

var customIcon = new L.icon({
    iconUrl: '/img/icon1.png',
    iconSize: [30, 30]
});
var customIcon2 = new L.icon({
    iconUrl: '/img/clinica.png',
    iconSize: [30, 30]
});

var customIcon3 = new L.icon({
    iconUrl: '/img/peligro.png',
    iconSize: [30, 30]
});

//prueba

//fin prueba


// Marker
const marker = L.marker([4.140160, -73.614393], { icon: customIcon }); // barrio popular
marker.bindPopup('<h1 align ="center" style="color:red" >Zona de riesgo!</h1><p>hombre recién salido de la cárcel viola cuarentena y se pasea por la zona sin tener resultados de prueba del covid-19</p>');
map.addLayer(marker);

const marker1 = L.marker([4.150625, -73.632542], { icon: customIcon3 }); // barrio san isidro
marker1.bindPopup('<h1 align ="center" style="color:red" >Zona de alto riesgo!</h1><p>la alcaldía de villavicencio ha decidido cercar la zona y realizar puestos de vigilancia para que se cumplan las medidas sanitarias estrictas por considerarse zona de alto riesgo de contagio.</p>');
map.addLayer(marker1);
//L.marker([4.0100376, -74.571054], { icon: customIcon }).addTo(map);

const marker2 = L.marker([4.143690, -73.644415], { icon: customIcon2 }); // hospital
marker2.bindPopup('<h1 align ="center" style="color:blue">Hospital</h1><p>hospital departamental de villavicencio </p>');
map.addLayer(marker2);

const marker3 = L.marker([4.144694, -73.636961], { icon: customIcon2 }); // clinica meta
marker3.bindPopup('<h1 align ="center" style="color:blue">Clínica</h1><p>Clínica meta de la ciudad de villavicencio </p>');
map.addLayer(marker3);

const marker4 = L.marker([4.146970, -73.639060], { icon: customIcon2 }); // clinica Marta
marker4.bindPopup('<h1 align ="center" style="color:blue">Clínica</h1><p>Nueva Clínica Carlos Fábian Nieto Rojas, destinada a tratar casos de covid-10 </p>');
map.addLayer(marker4);

const marker5 = L.marker([4.145397, -73.625939], { icon: customIcon3 }); // carcel villavicencio
marker5.bindPopup('<h1 align ="center" style="color:red">Cárcel de Villavicencio!</h1><p>Se han registrado 879 casos confirmados al 20 de mayo 2020 </p>');
map.addLayer(marker5);

const marker6 = L.marker([4.128802, -73.588788], { icon: customIcon }); // pinilla
marker6.bindPopup('<h1 align ="center" style="color:red">Zona de riesgo!</h1><p>hombre recién salido de la cárcel positivo para covid-19 viola cuarentena y realiza fiesta con familiares y amigos.</p>');
map.addLayer(marker6);

const marker7 = L.marker([4.148211, -73.639044], { icon: customIcon2 }); // clinica cooperativa
marker7.bindPopup('<h1 align ="center" style="color:blue">Clínica</h1><p>Clínica primavera, antes conocidad como clínica cooperativa</p>');
map.addLayer(marker7);

const marker8 = L.marker([4.147213, -73.639629], { icon: customIcon }); // caso barzal
marker8.bindPopup('<h1 align ="center" style="color:red">Zona de riesgo!</h1><p>hombre positivo para covid-19, de aproximadamente 55 años de edad, salió del hospital y caminó unas seis cuadras hasta la Clínica Primavera, antes llamada Cooperativa, en el barrio Barzal, lugar habitual donde a diario permanece, según los vecinos del sector.</p>');
map.addLayer(marker8);



// Geolocation

map.locate({ enableHighAccuracy: true })
map.on('locationfound', (e) => {
    const coords = [e.latlng.lat, e.latlng.lng];
    const newMarker = L.marker(coords);
    newMarker.bindPopup('<h1>tu estas aqui!</h1>');
    map.addLayer(newMarker);
    socket.emit('userCoordinates', e.latlng);
    //console.log(newMarker);
});



// socket new User connected
socket.on('newUserCoordinates', (coords) => {
    console.log(coords);
    const userIcon = L.icon({
        iconUrl: '/img/persona.png',
        iconSize: [30, 39],
    })
    const newUserMarker = L.marker([coords.lat, coords.lng], {
        icon: userIcon
    });
    newUserMarker.bindPopup('Alguien interesado esta consultando el mapa');
    map.addLayer(newUserMarker);
});

map.addLayer(tile);
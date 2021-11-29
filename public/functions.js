// SELECCION DE ELEMENTOS
const form = document.getElementById('homepage');
const charts = document.getElementById('charts');

const logo = document.getElementById('logo');
const input = document.getElementById('input');
const findButton = document.getElementById('find-button')

const graph = document.getElementById('grafica')
const actual = document.getElementById('actual')
const optima = document.getElementById('optima')
const promedio = document.getElementById('promedio')
const contenido = document.getElementById('contenido')
const tiempo = document.getElementById('tiempo')

const to = document.getElementById('to');
const from = document.getElementById('from');

// VARIABLES DE CONTROL
let onCharts = false;
let apiEndpoint = "https://code-med-iot.herokuapp.com/api/contenedores/";
let reads = [];
let id = "";
let lastRead = [];

// FUNCTIONS
const goToBeginning = () => {
    charts.style.display ="none";
    form.style.display = "";
    onCharts = false;
    reads = [];
    id = "";
}
const goToCharts = () => {
    charts.style.display = "";
    form.style.display = "none";
    onCharts = true;
    
}
const updateUI = (containerData) => {
    optima.innerHTML = "Temperatura óptima: " + containerData.temperaturaOptima + "C";
    contenido.innerHTML = "Contenido de la hielera: " + containerData.contenido;
    to.innerHTML = containerData.to;
    from.innerHTML = containerData.from;

    let reads = Object.entries(containerData.lecturas);
    lastRead = reads[reads.length - 1];

    actual.innerHTML = "Temperatura actual: " + lastRead[1].temperatura + "C";

    let date = new Date(lastRead[1].fecha).toLocaleString("es-MX", {timeZone: "CST"});
    tiempo.innerHTML = "Última actualización a las: " + date;

    let sum = 0;
    reads.forEach(([key, read]) => {
        let currentRead = document.createElement('div')
        currentRead.classList.add('lectura')
        currentRead.style.height = (read.temperatura * 2.5) + "px";
        grafica.appendChild(currentRead)
        sum += read.temperatura;
    });
    let average = sum / reads.length;
    
    promedio.innerHTML = "El promedio de temperatura es de: " + average.toFixed(2) + "C";
}
const updateLastRead = () => {}
const getLastRead = async () => {}
const getContainer = async (event) => {
    event.preventDefault();
    id = input.value;
    let endpointDirection = apiEndpoint + id;

    const resContainer = await fetch(endpointDirection);
    const dataContainer = await resContainer.json();

    goToCharts();

    updateUI(dataContainer.data);
}

// EVENT LISTENERS
logo.addEventListener('click', goToBeginning);
findButton.addEventListener('click', getContainer);

// SETUP INICIAL
charts.style.display ="none";
form.style.display = "";

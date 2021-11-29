// SELECCION DE ELEMENTOS
const form = document.getElementById('homepage');
const charts = document.getElementById('charts');

const logo = document.getElementById('logo');
const input = document.getElementById('input');
const findButton = document.getElementById('find-button')

// VARIABLES DE CONTROL
let onCharts = false;
let apiEndpoint = "https://code-med-iot.herokuapp.com/api/contenedores/";
let reads = [];
let id = "";

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
const getContainer = async (event) => {
    event.preventDefault();
    id = input.value;
    let endpointDirection = apiEndpoint + id;

    const resContainer = await fetch(endpointDirection);
    const dataContainer = await resContainer.json();

    console.log(dataContainer);

    goToCharts();
}

// EVENT LISTENERS
logo.addEventListener('click', goToBeginning);
findButton.addEventListener('click', getContainer);

// SETUP INICIAL
charts.style.display ="none";
form.style.display = "";

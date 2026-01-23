//luister naar het document event om te controleren of de pagina volledig is geladen
document.addEventListener('DOMContentLoaded',function() {
   
    //haal de laast opgeslagen locatie op uit local storage
    const savedLocation = localStorage.getItem('lastLocation');

    //controlleer of er een opgeslagen locatie is
    if (savedLocation) {
     
        // stel de waarde van het locatie-invoerveld in op de opgeslagen locatie
        document.getElementById('location-input').value = savedLocation;
      
        // haal het weer op voor de opgeslagen locatie's
        getWeather(savedLocation);
    }
});

//voeg een 'click' eventlistener toe aan de weer ophaalknop
document.getElementById('get-weather-btn').addEventListener('click', function() {
    //haal de waarde van het locatie invoerveld op 
    const location = document.getElementById('location-input').value;
    //sla de locatie op in local storage
    localStorage.setItem('lastLocation', location);
    //haal het weer op voor de ingevoerde locatie
    getWeather(location);
});

//functie om het weer op te halen bij de opgegeven locatie
function getWeather(location) {
    //API sleutel voor de openweathermap service
    const apiKey = '2873fb709c6002ac57244b67bbe34596';
    //URL voor de weersvoorpselling API aanroep
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=nl`;
    
    //voer de api aanroep uit met fetch api
    fetch(url)
        .then(response => {
            //controlleer of de aanroep succesvol was
            if (!response.ok) {
                //doet een foutmelding als de api aanroep mislukt
                throw new Error('weerdata niet gevonden');

            }
            //converteer de respons naar JSON
            return response.json();
        })
        .then(data => {
            //update de weerinformatie in de DOM
            updateWeatherData(data);
        })
        .catch(error => {
            //toon een foutmelding als er een fout optreedt
 document.getElementById('weather-result').textContent = error.message;


});   
}

//functie om de weerinformatie in de DOM te updaten 
function updateWeatherData(data) {
    //verkrijg de div waar de weerresultaaten getoond worden
    const weatherResult = document.getElementById('weather-result');
    // converteer de UNIX- timestamps naar leesbare tijden voor zonsopgang en zonondergang
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

// stel de innerHTML van de weerresultaat div in met de opgehaalde weerdata
weatherResult.innerHTML = `
<h2>Weer in ${data.name}</h2>
<p>Temperatuur: ${data.main.temp} °C</p>
<p>Weer: ${data.weather[0].description}</p>
<p>Luchtvochtigheid: ${data.main.humidity}%</p>
<p>Wind Snelheid: ${data.wind.speed} m/s</p>
<p>Zonsopgang: ${sunriseTime}</p>
<p>Zonsondergang: ${sunsetTime}</p>
`;







}   
            

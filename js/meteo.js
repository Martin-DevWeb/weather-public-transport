// Importing the file "conf.json"
import dataJson from '../conf.json' assert {type: 'json'};

// Calling the city written on the file "conf.json"
var city = dataJson.selectedCity;


let weather = {
  // API Key
  "apiKey": "b60bd3135da7441fae2143635232006",

  // Request to get the weather with the param city
  fetchWeather: function(city) {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key="
      + this.apiKey
      + "&lang=fr&q="
      + city
      + "&aqi=no"
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },

  // The values i am using from the weather Api
  displayWeather: function(data) {

    // Handling errors and displaying personalized error message
    if (data.error) {
      if (data.error.code === 1003) {
        document.querySelector(".details").classList.add("error");
        document.querySelector(".description").classList.add("error-style");
        document.querySelector(".description").innerText = "Erreur : Veuillez entrer une ville.";
      }
      else if (data.error.code === 1006) {
        document.querySelector(".details").classList.add("error");
        document.querySelector(".description").classList.add("error-style");
        document.querySelector(".description").innerText = "Erreur : La ville indiquée n'a pas été trouvée.";
      }
    }

    // Creating const for each value
    else {
      const { name } = data.location;
      const { icon, text } = data.current.condition;
      const { humidity, wind_kph, feelslike_c, temp_c, is_day } = data.current;


      // Displaying each value on the page
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src = "." + icon;
      document.querySelector(".description").innerText = text;
      document.querySelector(".temperature").innerText = temp_c + "°C";
      document.querySelector(".feel-text").innerText = "Ressenti : " + feelslike_c + " °C";
      document.querySelector(".humidity-text").innerText = "Humidité : " + humidity + " %";
      document.querySelector(".wind-text").innerText = "Vitesse du vent : " + wind_kph + " km/h";

      // Changing background and font colors based on day/night
      if (is_day === 0) {
        document.querySelector(".card").classList.add("night");
        document.querySelector(".card").classList.remove("day");
      }
    }
  }

};

weather.fetchWeather(city);

// Refreshing every hour
setInterval(function() {weather.fetchWeather(city)}, 36000000);
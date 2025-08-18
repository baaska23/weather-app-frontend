<script>
import {weatherService} from "@/services/weatherService.js";
import router from "@/router/router.js";
export default {
  name: 'WeatherGeneral',
  data() {
    return {
      weather: {},
      serviceEnabled: true,
      city: '',
    }
  },
  async mounted() {
    // await this.loadData();
  },
  methods: {
    async loadData(city) {
      if (this.serviceEnabled && city) {
        const response = await weatherService.getWeatherDataFromWS(city);
        this.weather = response.data;
        console.log("The weather data is: ", this.weather);
      }
    },
    goToDetail() {
      router.push({name: 'Detail', params: {city: this.city}});
    }
  }
}
</script>
<template>
  <div class="weather-general">
    <h4>Weather</h4>
    <button @click="goToDetail">Go to detail page</button>
    <input type="search" v-model="city" @change="loadData(city)" placeholder="Search for a city">
    <div class="weather-data">
      <section class="city-preview">
        <p>Location: {{weather.request?.query}}</p>
        <p>Current: {{weather.current?.temperature}}°C</p>
        <p>Description: {{weather.current?.weather_descriptions}}</p>
        <p>Sunrise and sunset: {{weather.current?.astro.sunrise}} - {{weather.current?.astro.sunset}}</p>
        <p>Time: {{weather.location?.localtime}}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.weather-general {
  max-width: 400px;
  margin: 40px auto;
  padding: 32px 24px;
  border-radius: 24px;
  background: linear-gradient(135deg, #4f8ef7 0%, #1e3c72 100%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  color: #fff;
  font-family: 'San Francisco', 'Helvetica Neue', Arial, sans-serif;
}

h4 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: 1px;
  text-align: center;
}

button {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 10px 24px;
  font-size: 1rem;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: rgba(255,255,255,0.25);
}

input[type="search"] {
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  border: none;
  margin-bottom: 24px;
  font-size: 1rem;
  background: rgba(255,255,255,0.2);
  color: #fff;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

input[type="search"]::placeholder {
  color: #e0e0e0;
  opacity: 1;
}

.weather-data {
  margin-top: 16px;
}

.city-preview {
  background: rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.city-preview p {
  margin: 10px 0;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  font-weight: 500;
}
</style>
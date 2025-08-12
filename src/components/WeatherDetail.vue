<script>
import {weatherService} from "@/services/weatherService.js";
import router from "@/router/router.js";
export default {
  name: 'WeatherDetail',
  data() {
    return {
      weather: {},
      serviceEnabled: false,
    }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      if (this.serviceEnabled) {
        const response = await weatherService.getWeatherDataFromWS("New York");
        this.weather = response.data;
        console.log("The weather data is: ", this.weather);
      }
    },
    goBackToHome() {
      router.push({name: 'Home'});
    }
  }
}
</script>
<template>
  <div class="detail">
    <h4>Weather Detail</h4>
    <button @click="goBackToHome">Go back to home page</button>
    <div class="weather-data">
      <section class="city-detail">
        <p>Location: {{weather.request?.query}}</p>
        <p>Current: {{weather.current?.temperature}}°C</p>
        <p>Feels like: {{weather.current?.feelslike}}</p>
        <p>Sunrise and sunset: {{weather.current?.astro.sunrise}} - {{weather.current?.astro.sunset}}</p>
        <p>Time: {{weather.location?.localtime}}</p>
      </section>
      <section>
        <p>Latitude and longitude: {{weather.location?.lat}} - {{weather.location?.lon}}</p>
        <p>Image: {{weather.current?.weather_icons}}</p>
        <p>Air quality: {{weather.current?.air_quality.co}}</p>
        <p>Humidity: {{weather.current?.humidity}}</p>
        <p>Pressure: {{weather.current?.pressure}}</p>
        <p>Visibility: {{weather.current?.visibility}}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
</style>
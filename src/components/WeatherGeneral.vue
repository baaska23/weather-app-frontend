<script>
import {weatherService} from "@/services/weatherService.js";
import router from "@/router/router.js";
export default {
  name: 'WeatherGeneral',
  data() {
    return {
      weather: {},
      serviceEnabled: true,
    }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      if (this.serviceEnabled) {
        const response = await weatherService.getWeatherDataFromWS("Tokyo");
        this.weather = response.data;
        console.log("The weather data is: ", this.weather);
      }
    },
    goToDetail() {
      router.push({name: 'Detail'});
    }
  }
}
</script>
<template>
  <div class="weather-general">
    <h4>Weather</h4>
    <button @click="goToDetail">Go to detail page</button>
    <input type="search" placeholder="Search for a city">
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
</style>
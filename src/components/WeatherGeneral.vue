<script>
import {weatherService} from "@/services/weatherService.js";
export default {
  name: 'WeatherGeneral',
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
    }
  }
}
</script>
<template>
  <div class="weather-general">
    <h4>Weather general component</h4>
    <div class="weather-data">
      <section>
        <p>Location: {{weather.request?.query}}</p>
        <p>Latitude and longitude: {{weather.location?.lat}} - {{weather.location?.lon}}</p>
        <p>Time: {{weather.location?.localtime}}</p>
      </section>
      <section>
        <p>Current: {{weather.current?.temperature}}°C</p>
        <p>Feels like: {{weather.current?.feelslike}}</p>
        <p>Image: {{weather.current?.weather_icons}}</p>
        <p>Description: {{weather.current?.weather_descriptions}}</p>
      </section>
      <section>
        <p>Sunrise and sunset: {{weather.current?.astro.sunrise}} - {{weather.current?.astro.sunset}}</p>
      </section>
      <section>
        <p>Air quality: {{weather.current?.air_quality.co}}</p>
        <p>Humidity: {{weather.current?.humidity}}</p>
        <p>Pressure: {{weather.current?.pressure}}</p>
      </section>

    </div>
  </div>
</template>

<style scoped>
</style>
<script>
import {weatherService} from "@/services/weatherService.js";
export default {
  name: 'WeatherGeneral',
  data() {
    return {
      weather: []
    }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.weather = await weatherService.getWeatherData("Berlin")
    }
  }
}
</script>
<template>
  <div class="weather-general">
    <h4>Weather general component</h4>
    <div class="weather-data">
      <p>Location: {{weather.address}}</p>
      <p>Latitude and longitude: {{weather.latitude}} - {{weather.longitude}}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
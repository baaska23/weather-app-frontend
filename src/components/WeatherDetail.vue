<script>
import {weatherService} from "@/services/weatherService.js";
import router from "@/router/router.js";
export default {
  name: 'WeatherDetail',
  props: ['city'],
  data() {
    return {
      weather: {},
      serviceEnabled: true,
    }
  },
  async mounted() {
    const cityRoute = this.$route.params.city;
    if (this.city) {
      await this.loadData(this.city);
    } else {
      console.error("No city found in props or route params");
    }
  },
  watch: {
    city(newCity) {
      if (newCity) {
        this.loadData(newCity);
      }
    },
    '$route.params.city'(newCity) {
      if (newCity && newCity !== this.city) {
        this.loadData(newCity);
      }
    }
  },
  methods: {
    async loadData(city) {
      if (this.serviceEnabled && city) {
        try {
          const response = await weatherService.getWeatherDataFromWS(city);
          this.weather = response.data;
        } catch (error) {
          console.error("Error in loadData:", error);
        }
      } else {
        console.log("loadData conditions not met - serviceEnabled:", this.serviceEnabled, "city:", city);
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
        <p>Image: <img v-if="weather.current?.weather_icons" :src="weather.current.weather_icons[0]"  alt="Weather icon"></p>
        <p>Air quality: {{weather.current?.air_quality.co}}</p>
        <p>Humidity: {{weather.current?.humidity}}</p>
        <p>Pressure: {{weather.current?.pressure}}</p>
        <p>Visibility: {{weather.current?.visibility}}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.detail {
  max-width: 420px;
  margin: 48px auto;
  padding: 36px 28px;
  border-radius: 28px;
  background: linear-gradient(135deg, #4f8ef7 0%, #1e3c72 100%);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  color: #fff;
  font-family: 'San Francisco', 'Helvetica Neue', Arial, sans-serif;
}

h4 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 28px;
  letter-spacing: 1px;
  text-align: center;
}

button {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 12px 28px;
  font-size: 1rem;
  margin-bottom: 24px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: rgba(255,255,255,0.25);
}

.weather-data {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.city-detail {
  background: rgba(255,255,255,0.10);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 12px;
}

.city-detail p,
.weather-data section p {
  margin: 10px 0;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.weather-data section {
  background: rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

img {
  width: 48px;
  height: 48px;
  vertical-align: middle;
  border-radius: 12px;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
</style>
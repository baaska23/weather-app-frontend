import api from "@/router/api.js";

export const weatherService = {
    async getWeatherData(city) {
        return await api.get("/weather", {params: {city}});
    }
}
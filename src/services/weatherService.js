import api from "@/router/api.js";

export const weatherService = {
    async getWeatherData(city) {
        return await api.get("/weather", {params: {city}});
    },

    async getWeatherDataFromWS(city){
        return await api.get("/ws", {params: {city}});
    }
}
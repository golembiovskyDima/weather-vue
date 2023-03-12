import axiosInstance from "axios";

const axios = axiosInstance.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid: import.meta.env.VITE_WEATHER_API_KEY,
        units: 'metric'
    }
});

export default axios
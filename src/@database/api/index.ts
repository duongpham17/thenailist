import axios from 'axios';

const development = process.env.DEVELOPMENT_URL;

const production = process.env.PRODUCTION_URL;

const url = process.env.NODE_ENV === "development" ? development : production;

const storage = typeof window === "undefined" ? "" :  localStorage.getItem("user");

const user = storage ? JSON.parse(storage) : {};

export const api = axios.create({
    baseURL:`${url}/api`,
    headers: {
        "Content-Type" : "application/json",
        "Authorization": `${user.token}`
    },
});

export default api
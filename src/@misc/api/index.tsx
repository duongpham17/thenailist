import axios from 'axios';

const development = "https://casabella.onrender.com"  //"http://localhost:8000";

const production = "https://casabella.onrender.com";

const url = process.env.NODE_ENV === "development" ? development : production;

export const api = axios.create({
    baseURL:`${url}/api`,
    headers: {"Content-Type" : "application/json"},
});

export default api
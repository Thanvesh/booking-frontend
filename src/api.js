// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookingserver-19k4.onrender.com/api',
});

export default api;

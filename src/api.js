// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookingserver-1.onrender.com',
});

export default api;

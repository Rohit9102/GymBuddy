import axios from "axios";

const api = axios.create({
    baseURL: 'https://gymbuddy-backend-ylfz.onrender.com/auth'
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

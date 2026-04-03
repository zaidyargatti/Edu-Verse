import axios from 'axios';

const api = axios.create({
    baseURL: 'https://edu-verse-63ox.onrender.com/api',
})

api.interceptors.request.use((req)=>{
    const token = localStorage.getItem('token')
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
  return req;
})

export default api;
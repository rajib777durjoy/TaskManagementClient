import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL:'https://tesk-server.vercel.app',
     withCredentials:true
  });
const useAxios = () => {
  const {logoutUser}=useAuth()
  const navigateLogin=useNavigate()
  axios.interceptors.response.use(function (response) {
    return response;
  },function (error) {
    // console.log('error',error)
    if(error.status === 401 || error.status === 403){
      logoutUser()
     .then(()=>{
      navigateLogin('/login')
     })
    }
   
    return Promise.reject(error);
  });
    return instance;
};

export default useAxios;
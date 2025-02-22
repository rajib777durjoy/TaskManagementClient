import axios from 'axios';
//  'https://tesk-server.vercel.app'
const instance = axios.create({
    baseURL:'https://tesk-server.vercel.app',
   
  });
const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;
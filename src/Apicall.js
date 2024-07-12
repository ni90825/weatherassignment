import axios from "axios";
import { notification } from "./App";
// import { env } from 'node:process';
const apiKey = process.env;

export const Geocoding=async (locationname)=>{
    try{
    const response=await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${locationname}&apiKey=${apiKey.REACT_APP_API_KEY_Geocoding}`)   

  return response
    }
      catch(exception){
        return exception
      }

}

export const Currentdata= async (long,lat)=>{
    try{
    const response=await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${apiKey.REACT_APP_API_KEY_weatherbit}&include=hourly`)   

return response;

    }
      catch(exception){
        // console.log(exception)
        return exception
      }
}

export const Quotedetail = async()=>{
    try{
        const response=await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key':apiKey.REACT_APP_API_KEY_QUOTERESPONSE,
        }
      })

      return response.data;
    }
    catch(exception){
        return exception.message;
    }
}


export const hourlyforecast = async (lon,lat)=>{
    const response=await axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=${apiKey.REACT_APP_API_KEY_weatherbit}&hours=15`)  
    
    return response;
}

export const _7daysforecast = async (lon,lat)=>{
    const response=await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey.REACT_APP_API_KEY_weatherbit}&days=8 `)  
    
    return response;
}
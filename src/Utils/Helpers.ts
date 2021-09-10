import axios, {AxiosRequestConfig} from 'axios';
import {API_URL, API_KEY} from './Constants';

export const fetcher = async (config: AxiosRequestConfig) => {
  const {url} = config;

  return axios.get(`${API_URL}${url}?api-key=${API_KEY}`);
};

export const onError = (error: any) => {
  if (error?.response) {
    console.log({error: error?.response});
  } else {
    console.log({error});
  }
};

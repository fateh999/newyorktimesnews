import axios from 'axios';
import {API_URL} from './Constants';
import UltimateConfig from 'react-native-ultimate-config';

export const fetcher = async (url: string) => {
  return axios.get(`${API_URL}${url}?api-key=${UltimateConfig.API_KEY}`);
};

export const onError = (error: any) => {
  if (error?.response) {
    console.log({error: error?.response});
  } else {
    console.log({error});
  }
};
